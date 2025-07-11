import type React from "react"
import type { Metadata } from "next"
import { Navigation } from "@/components/layout/navigation"
import "./globals.css"

export const metadata: Metadata = {
  title: "CADT Freshman Coding Championship",
  description: "Live leaderboard for CADT Freshman Coding Championship",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
