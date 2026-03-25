"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function CreateListingForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // client-side validation
    if (
  !form.title ||
  !form.description ||
  !form.price ||
  !form.category ||
  !form.location 
) {
  setError("All fields are required")
  return
}
    setError("")
    setLoading(true)

    try {
      const res = await axios.post("/api/listings/create", {
        ...form,
        price: Number(form.price) // ensure number
      })

      alert("Listing created!")
      router.push("/dashboard")
    } catch (err) {
      console.error(err.response?.data || err)
      setError(err.response?.data?.error || "Error creating listing")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Create Listing</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
  type="number"
  name="price"
  placeholder="Price"
  value={form.price}
  onChange={handleChange}
  className="border p-2 w-full"
/>

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2"
        >
          {loading ? "Publishing..." : "Publish Listing"}
        </button>

      </form>
    </div>
  )
}