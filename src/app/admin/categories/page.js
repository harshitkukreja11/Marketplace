"use client"

import { useState } from "react"
import axios from "axios"

export default function CategoriesPage() {

  const [name, setName] = useState("")

  const createCategory = async () => {

    await axios.post("/api/categories/create", {
      name
    })

    alert("Category created")
    setName("")
  }

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-5">
        Create Category
      </h1>

      <input
        type="text"
        placeholder="Category name"
        className="border p-2 mr-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={createCategory}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Create
      </button>

    </div>
  )
}