async function getListings() {

  try {

    const res = await fetch(
      "http://localhost:3000/api/listings",
      { cache: "no-store" }
    )

    if (!res.ok) return []

    return await res.json()

  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Home() {

  const listings = await getListings()

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Latest Listings
      </h1>

      <div className="grid grid-cols-3 gap-5">

        {listings.map((item) => (

          <div
            key={item.id}
            className="border p-4 rounded"
          >
            <h2 className="font-bold">
              {item.title}
            </h2>

            <p>{item.price} AED</p>

            <p className="text-gray-500">
              {item.category}
            </p>
          </div>

        ))}

      </div>

    </div>
  )
}