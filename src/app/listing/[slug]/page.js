import { prisma } from "@/lib/prisma"

async function getListing(slug) {
  return prisma.listing.findUnique({
    where: { slug }
  })
}

export default async function ListingPage({ params }) {

  const listing = await getListing(params.slug)

  if (!listing) return <div>Listing not found</div>

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        {listing.title}
      </h1>

      <p className="mt-4">
        {listing.description}
      </p>

      <p className="mt-2">
        {listing.price} AED
      </p>

      <p className="mt-2 text-gray-500">
        {listing.location}
      </p>

    </div>
  )
}