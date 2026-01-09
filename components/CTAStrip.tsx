import Link from "next/link"
import { Button } from "@/components/ui/button"

type CTAStripProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
}

const CTAStrip = ({
  title = "Ready to feel informed and supported?",
  subtitle = "Book a session and take the first step towards a calmer, more confident experience.",
  buttonText = "Book a session",
  buttonHref = "/services",
}: CTAStripProps) => {
  return (
    <section className="bg-blush/30 py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary max-w-2xl mx-auto text-balance">
          {title}
        </h2>
        <p className="mt-4 text-text-secondary max-w-xl mx-auto text-balance">{subtitle}</p>
        <Button asChild size="lg" className="mt-8 bg-rose hover:bg-terracotta text-white rounded-full px-8">
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}

export default CTAStrip
