import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import StatsSection from "@/components/home/StatsSection"
import ServicesPreviewSection from "@/components/home/ServicesPreviewSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import FreeGuidesSection from "@/components/home/FreeGuidesSection"
import FAQSection from "@/components/home/FAQSection"
import CTAStrip from "@/components/CTAStrip"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com"

export const metadata: Metadata = {
  alternates: {
    canonical: baseUrl,
  },
}

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <StatsSection />
      <ServicesPreviewSection />
      <TestimonialsSection />
      <FreeGuidesSection />
      <FAQSection />
      <CTAStrip />
    </>
  )
}

export default HomePage
