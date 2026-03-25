import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"

async function getListings() {
  try {
    return await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
  } catch (error) {
    console.log("FETCH LISTINGS ERROR:", error)
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

      {listings.length === 0 ? (
        <p className="text-gray-500">
          No Listings Available
        </p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {listings.map((item) => (

            <div
              key={item.id}
              className="border p-4 rounded hover:shadow-md transition"
            >

              <h2 className="font-bold text-lg">
                {item.title}
              </h2>

              <p className="text-blue-600 font-semibold mt-2">
                {item.price} AED
              </p>

              <p className="text-gray-500 mt-1">
                {item.category}
              </p>

              <p className="text-gray-400 text-sm mt-2">
                {item.location}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  )
}