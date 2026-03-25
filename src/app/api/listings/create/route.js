import { prisma } from "@/lib/prisma"
import { getUser } from "@/lib/auth"
import { NextResponse } from "next/server"

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
}

export async function POST(req) {
  try {

    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    console.log("BODY:", body)

    const {
      title,
      description,
      price,
      category,
      location
    } = body

    if (!title || !description || !price || !category || !location) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      )
    }

    let slug = generateSlug(title)

    // ensure unique slug
    const existing = await prisma.listing.findFirst({
      where: { slug }
    })

    if (existing) {
      slug = slug + "-" + Date.now()
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        slug,
        description,
        price: Number(price),
        category,
        location,
        images: [],
        userId: user.id
      }
    })

    return NextResponse.json({
      message: "Listing created",
      listing
    })

  } catch (error) {

    console.error("CREATE LISTING ERROR:", error)

    return NextResponse.json(
      {
        error: "Server error",
        details: error.message
      },
      { status: 500 }
    )
  }
}