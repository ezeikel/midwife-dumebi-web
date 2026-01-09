import type { Metadata } from "next"
import ServicesContent from "@/components/services/ServicesContent"
import CTAStrip from "@/components/CTAStrip"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Browse midwifery support services including birth planning, NHS decision support, maternity notes guidance, and emotional support packages.",
}

const ServicesPage = () => {
  return (
    <>
      <ServicesContent />
      <CTAStrip
        title="Not sure which service is right for you?"
        subtitle="Get in touch and I'll help you find the perfect fit for your needs."
        buttonText="Contact me"
        buttonHref="mailto:hello@midwifedumebi.com"
      />
    </>
  )
}

export default ServicesPage
