import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {

  const body = await req.json()

  const category = await prisma.category.create({
    data: {
      name: body.name,
      image: body.image
    }
  })

  return NextResponse.json(category)
}