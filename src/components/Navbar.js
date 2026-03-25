"use client"

import { useRouter } from "next/navigation"

export default function Navbar() {

  const router = useRouter()

  return (
    <div className="bg-white shadow p-4 flex justify-between">

      <h1
        className="font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Classified Marketplace
      </h1>

      <div>

        <button
          onClick={() => router.push("/login")}
          className="mr-4"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="mr-4"
        >
          Register
        </button>
        
        <button
  onClick={() => router.push("/create-listing")}
  className="mr-4"
>
  Post Listing
</button>

      </div>

    </div>
  )
}