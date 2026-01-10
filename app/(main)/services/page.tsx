import type { Metadata } from "next"
import ServicesContent from "@/components/services/ServicesContent"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import CTAStrip from "@/components/CTAStrip"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com"

export const metadata: Metadata = {
  title: "Midwifery Services | Birth Planning Sessions & Support Packages",
  description:
    "Virtual midwifery sessions from £110. Birth planning, NHS navigation, emotional support, and postnatal consultations. Book your session with an NHS-experienced midwife.",
  keywords: [
    "midwife services",
    "birth planning session",
    "virtual midwife consultation",
    "postnatal support",
    "midwife packages",
    "NHS maternity support",
    "pregnancy support UK",
  ],
  alternates: {
    canonical: `${baseUrl}/services`,
  },
  openGraph: {
    title: "Midwifery Services | Midwife Dumebi",
    description: "Virtual midwifery sessions from £110. Birth planning, NHS navigation, and emotional support.",
    url: `${baseUrl}/services`,
  },
}

const ServicesPage = () => {
  return (
    <>
      <div className="bg-background pt-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Services" }]} className="max-w-6xl mx-auto" />
        </div>
      </div>
      <ServicesContent />
      <CTAStrip
        title="Not sure which service is right for you?"
        subtitle="Get in touch and I'll help you find the perfect fit for your needs."
        buttonText="Contact me"
        buttonHref="mailto:hi@midwifedumebi.com"
      />
    </>
  )
}

export default ServicesPage
