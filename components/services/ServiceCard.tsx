"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faCheck, faCalendarDays, faXmark } from "@fortawesome/pro-solid-svg-icons"
import { Button } from "@/components/ui/button"
import CalAvailabilityPicker from "@/components/booking/CalAvailabilityPicker"
import type { Service } from "@/lib/services"

type ServiceCardProps = {
  service: Service
  index: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="group h-full"
      >
        <div className="h-full bg-surface rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-blush/50 transition-all duration-300 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-serif text-xl font-semibold text-text-primary group-hover:text-rose transition-colors leading-tight">
              {service.title}
            </h3>
            <span className="shrink-0 font-serif text-2xl font-bold text-rose">{service.priceDisplay}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
            <FontAwesomeIcon icon={faClock} size="sm" className="text-sage" />
            <span>{service.duration}</span>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">{service.description}</p>

          <ul className="space-y-2 mb-6 flex-1">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <FontAwesomeIcon icon={faCheck} size="xs" className="text-sage mt-1 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => setShowCalendar(true)}
            className="w-full bg-rose hover:bg-terracotta text-white rounded-full group-hover:shadow-md transition-all"
          >
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
            Book Now
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/50 backdrop-blur-sm"
            onClick={() => setShowCalendar(false)}
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
                  <h2 className="font-serif text-xl font-semibold text-text-primary">{service.title}</h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    {service.duration} • {service.priceDisplay}
                  </p>
                </div>
                <button
                  onClick={() => setShowCalendar(false)}
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
                  service={service}
                  onSlotSelected={(slot) => {
                    // Navigate to checkout with selected slot
                    const params = new URLSearchParams({
                      date: slot.date,
                      time: slot.time,
                      datetime: slot.datetime,
                    })
                    window.location.href = `/checkout/${service.slug}?${params.toString()}`
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

export default ServiceCard
