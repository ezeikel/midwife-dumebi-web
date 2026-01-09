"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { services, type Service } from "@/lib/services"
import CalAvailabilityPicker from "@/components/booking/CalAvailabilityPicker"

const featuredServices = services.filter((s) => s.type !== "digital").slice(0, 4)

const ServicesPreviewSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleBookNow = (service: Service) => {
    setSelectedService(service)
  }

  const handleClose = () => {
    setSelectedService(null)
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary">Services</h2>
            <p className="mt-4 text-text-secondary">
              Choose the support that&apos;s right for you. All sessions are delivered online via video call.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="h-full bg-surface rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-blush/50 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-serif text-xl font-semibold text-text-primary group-hover:text-rose transition-colors">
                      {service.title}
                    </h3>
                    <span className="shrink-0 font-serif text-2xl font-bold text-rose">{service.priceDisplay}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <FontAwesomeIcon icon={faClock} size="sm" className="text-sage" />
                    <span>{service.duration}</span>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{service.description}</p>

                  <Button
                    onClick={() => handleBookNow(service)}
                    className="w-full bg-rose hover:bg-terracotta text-white rounded-full group-hover:shadow-md transition-all"
                  >
                    Book Now
                    <FontAwesomeIcon icon={faArrowRight} size="sm" className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-border hover:bg-section-alt bg-transparent"
            >
              <Link href="/services">
                View all services
                <FontAwesomeIcon icon={faArrowRight} size="sm" className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-surface rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 flex items-start justify-between p-6 border-b border-border bg-surface rounded-t-2xl">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-text-primary">{selectedService.title}</h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    {selectedService.duration} • {selectedService.priceDisplay}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 -m-2 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
              </div>

              {/* Calendar picker */}
              <div className="p-6">
                <p className="text-text-secondary mb-4">
                  Select an available date and time below, then proceed to payment.
                </p>
                <CalAvailabilityPicker
                  service={selectedService}
                  onSlotSelected={(slot) => {
                    const params = new URLSearchParams({
                      date: slot.date,
                      time: slot.time,
                      datetime: slot.datetime,
                    })
                    window.location.href = `/checkout/${selectedService.slug}?${params.toString()}`
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ServicesPreviewSection
