"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import NewsletterForm from "@/components/NewsletterForm"

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-section-alt to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blush/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="inline-block px-4 py-1.5 bg-blush/30 text-rose rounded-full text-sm font-medium mb-6">
              NHS-Experienced NMC Registered Midwife
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-tight tracking-tight text-balance">
              Calm, empowering support for your pregnancy journey
            </h1>

            <p className="mt-6 text-lg text-text-secondary leading-relaxed text-pretty">
              Non-clinical guidance to help you make informed choices, understand your options, and feel confident
              throughout your pregnancy and birth experience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-rose hover:bg-terracotta text-white rounded-full px-8">
                <Link href="/services">Book a session</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-border hover:bg-section-alt bg-transparent"
              >
                <Link href="#free-guides">Get a free guide</Link>
              </Button>
            </div>

            {/* Inline newsletter */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">
                Sign up for tips, resources, and exclusive guides delivered to your inbox.
              </p>
              <NewsletterForm variant="hero" />
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/pexels-cottonbro-5857822.JPG"
                alt="Midwife Dumebi providing supportive care"
                className="object-cover w-full h-full"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 to-transparent" />
            </div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -left-4 md:-left-8 bottom-12 bg-surface rounded-2xl p-4 shadow-lg max-w-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 shrink-0 aspect-square rounded-full bg-sage/30 flex items-center justify-center text-sage font-serif font-semibold text-sm">
                  JM
                </div>
                <div>
                  <p className="text-sm text-text-secondary italic leading-relaxed">
                    &ldquo;I felt so much more confident going into my birth after our session.&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-text-secondary font-medium">Jessica M.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
