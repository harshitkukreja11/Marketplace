import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { prisma } from "./prisma"

export async function getUser() {
  try {

    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value

    if (!token) return null

    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET
    )

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })

    return user

  } catch (error) {
    return null
  }
}