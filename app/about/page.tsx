import type { Metadata } from "next"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faGraduationCap, faHandHoldingHeart, faUserNurse } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import CTAStrip from "@/components/CTAStrip"

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Midwife Dumebi - an NMC registered midwife and nurse with over 10 years NHS experience, offering calm, empowering support for your pregnancy journey.",
}

const values = [
  {
    icon: faHeart,
    title: "Compassionate Care",
    description: "Every person deserves to feel heard, respected, and supported throughout their pregnancy journey.",
  },
  {
    icon: faGraduationCap,
    title: "Informed Choice",
    description: "I believe in empowering you with knowledge so you can make confident decisions about your care.",
  },
  {
    icon: faHandHoldingHeart,
    title: "Emotional Support",
    description: "Pregnancy and birth can bring complex emotions. I provide a safe, judgement-free space to talk.",
  },
  {
    icon: faUserNurse,
    title: "Professional Expertise",
    description: "With over a decade of NHS experience, I bring clinical knowledge to help you navigate the system.",
  },
]

const AboutPage = () => {
  return (
    <>
      {/* Hero section */}
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/professional-black-female-midwife-portrait-warm-li.jpg"
                  alt="Midwife Dumebi - professional portrait"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blush/30 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage/30 rounded-full blur-2xl -z-10" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-blush/30 text-rose rounded-full text-sm font-medium mb-6">
                About Me
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary leading-tight">
                Hello, I&apos;m Dumebi
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                I&apos;m an NMC registered midwife and nurse with over 10 years of experience working in the NHS.
                I&apos;ve supported hundreds of families through pregnancy, birth, and beyond.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                My passion is helping people feel informed, confident, and empowered as they navigate the maternity
                system. Whether you&apos;re planning your birth, trying to understand your options, or processing a
                difficult experience, I&apos;m here to support you.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                I offer non-clinical support sessions via video call, providing a calm, professional space where you can ask
                questions, explore your choices, and feel truly heard.
              </p>
              <div className="mt-8">
                <Button asChild className="bg-rose hover:bg-terracotta text-white rounded-full px-8">
                  <Link href="/services">Explore my services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary">What I believe in</h2>
            <p className="mt-4 text-text-secondary">The principles that guide my work and the support I provide.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-surface rounded-2xl p-6 border border-border shadow-sm text-center hover:border-blush/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-blush/20 flex items-center justify-center text-rose mx-auto mb-4">
                  <FontAwesomeIcon icon={value.icon} size="lg" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary text-center mb-12">
              Qualifications & Experience
            </h2>

            <div className="space-y-6">
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Professional Registration</h3>
                <p className="text-text-secondary">
                  Registered Midwife (RM) and Registered Nurse (RN) with the Nursing and Midwifery Council (NMC)
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Clinical Experience</h3>
                <p className="text-text-secondary">
                  10+ years working within the NHS, including labour ward, antenatal clinic, postnatal care, and
                  community midwifery
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Specialist Training</h3>
                <p className="text-text-secondary">
                  Additional training in birth reflections, bereavement support, and trauma-informed care
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Ongoing Development</h3>
                <p className="text-text-secondary">
                  Committed to continuous professional development and staying up-to-date with evidence-based practice
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAStrip />
    </>
  )
}

export default AboutPage
