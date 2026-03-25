import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import CreateListingForm from "./CreateListingForm"

export default async function Page() {
  const user = await getUser()

  if (!user) redirect("/login") // redirect if not logged in

  return <CreateListingForm />
}