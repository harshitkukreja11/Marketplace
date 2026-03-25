"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function RegisterPage() {

  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {

      await axios.post("/api/auth/register", form)

      router.push("/login")

    } catch (err) {

      setError("Registration failed")

    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border mb-4 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border mb-4 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full p-2 border mb-4 rounded"
            onChange={handleChange}
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
            className="w-full bg-blue-600 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer ml-2"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}