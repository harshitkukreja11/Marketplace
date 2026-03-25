"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LoginPage() {

  const router = useRouter()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    setLoading(true)

    try {

      const res = await axios.post(
        "/api/auth/login",
        form
      )

    router.push("/dashboard")

    } catch (err) {

      setError("Invalid credentials")

    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border mb-4 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border mb-4 rounded"
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-green-600 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-4 text-center">

          Don't have an account?

          <span
            className="text-blue-600 cursor-pointer ml-2"
            onClick={() => router.push("/register")}
          >
            Register
          </span>

        </p>

      </div>
    </div>
  )
}