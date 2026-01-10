"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faQuoteLeft } from "@fortawesome/pro-solid-svg-icons"

const testimonials = [
  {
    id: 1,
    content:
      "Dumebi helped me understand my options and feel so much more prepared for my birth. Her calm, supportive approach made all the difference.",
    author: "Sarah T.",
    service: "Plan Your Birth With Confidence",
    rating: 5,
  },
  {
    id: 2,
    content:
      "After a difficult birth, I needed help processing what happened. Dumebi provided a safe space to talk through everything and helped me prepare for my hospital meeting.",
    author: "Emma L.",
    service: "Postnatal Clarity Package",
    rating: 5,
  },
  {
    id: 3,
    content:
      "I was completely overwhelmed by my maternity notes. In just one session, Dumebi helped me understand everything and gave me confidence to ask the right questions.",
    author: "Priya K.",
    service: "Understand Your Maternity Notes",
    rating: 5,
  },
  {
    id: 4,
    content:
      "The NHS decisions session was exactly what I needed. I felt heard and came away with clear questions for my next appointment.",
    author: "Rebecca M.",
    service: "Support With NHS Decisions",
    rating: 5,
  },
]

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary">What families say</h2>
          <p className="mt-4 text-text-secondary">Trusted by hundreds of families across the UK.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-2xl p-6 border border-border shadow-sm"
            >
              <FontAwesomeIcon icon={faQuoteLeft} size="lg" className="text-blush/50 mb-4" />

              <p className="text-text-secondary leading-relaxed italic mb-6">&ldquo;{testimonial.content}&rdquo;</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">{testimonial.author}</p>
                  <p className="text-xs text-text-secondary">{testimonial.service}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} size="sm" className="text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
