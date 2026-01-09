import type React from "react"
import type { Metadata, Viewport } from "next"
import { Newsreader, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-newsreader",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Midwife Dumebi | NHS-Experienced Midwife Support",
    template: "%s | Midwife Dumebi",
  },
  description:
    "Calm, empowering support from an NHS-experienced midwife. Non-clinical guidance for birth planning, maternity notes, and emotional support.",
  keywords: ["midwife", "birth planning", "NHS", "maternity support", "pregnancy", "UK midwife", "birth preferences"],
  authors: [{ name: "Midwife Dumebi" }],
  creator: "Midwife Dumebi",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://midwifedumebi.com",
    siteName: "Midwife Dumebi",
    title: "Midwife Dumebi | NHS-Experienced Midwife Support",
    description: "Calm, empowering support from an NHS-experienced midwife.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midwife Dumebi | NHS-Experienced Midwife Support",
    description: "Calm, empowering support from an NHS-experienced midwife.",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#FBF6EF",
  width: "device-width",
  initialScale: 1,
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en-GB" className={`${newsreader.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
