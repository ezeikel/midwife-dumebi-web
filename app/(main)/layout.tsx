import type React from "react"
import type { Metadata, Viewport } from "next"
import { Newsreader, Manrope, Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Providers from "./providers"
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo/json-ld"

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

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
})


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Midwife Dumebi | Birth Planning Support UK | NHS-Experienced Midwife",
    template: "%s | Midwife Dumebi",
  },
  description:
    "Expert birth planning support from an NHS-experienced midwife. Virtual consultations for UK parents-to-be. Birth preferences, NHS maternity guidance, and emotional support.",
  keywords: [
    "birth planning support UK",
    "private midwife UK",
    "NHS maternity guidance",
    "midwife consultation",
    "birth preferences",
    "pregnancy support",
    "postnatal support",
    "maternity notes",
    "birth planning",
    "UK midwife",
  ],
  authors: [{ name: "Midwife Dumebi" }],
  creator: "Midwife Dumebi",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: baseUrl,
    siteName: "Midwife Dumebi",
    title: "Midwife Dumebi | Birth Planning Support UK",
    description: "Expert birth planning support from an NHS-experienced midwife. Virtual consultations across the UK.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midwife Dumebi | Birth Planning Support UK",
    description: "Expert birth planning support from an NHS-experienced midwife. Virtual consultations across the UK.",
    creator: "@midwifedumebi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#FBF6EF",
  width: "device-width",
  initialScale: 1,
}

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
  ],
}

const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en-GB" className={`${newsreader.variable} ${manrope.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

export default MainLayout
