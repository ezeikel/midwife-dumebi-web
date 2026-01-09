"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointer, faCreditCard, faVideo } from "@fortawesome/free-solid-svg-icons"

const steps = [
  {
    icon: faHandPointer,
    title: "Choose your service",
    description: "Browse sessions and packages designed to support you through every stage of your journey.",
  },
  {
    icon: faCreditCard,
    title: "Pay securely",
    description: "Complete your payment through our secure checkout. All major cards accepted.",
  },
  {
    icon: faVideo,
    title: "Book instantly",
    description: "Choose a time that works for you and join via video call from the comfort of your home.",
  },
]

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary">How it works</h2>
          <p className="mt-4 text-text-secondary">Three simple steps to get the support you need.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line (hidden on mobile, shown between items) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+50px)] w-[calc(100%-60px)] h-0.5 bg-border" />
              )}

              <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blush/20 text-rose mb-6">
                <FontAwesomeIcon icon={step.icon} size="xl" />
              </div>

              <h3 className="font-serif text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
