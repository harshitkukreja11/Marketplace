import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {

  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome {user.name}
      </p>

    </div>
  )
}