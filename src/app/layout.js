import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Classified Marketplace",
  description: "Buy and Sell",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">

        <Navbar />

        {children}

      </body>
    </html>
  )
}