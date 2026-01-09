import HeroSection from "@/components/home/HeroSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import StatsSection from "@/components/home/StatsSection"
import ServicesPreviewSection from "@/components/home/ServicesPreviewSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import FreeGuidesSection from "@/components/home/FreeGuidesSection"
import FAQSection from "@/components/home/FAQSection"
import CTAStrip from "@/components/CTAStrip"

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
