"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faCheck, faCalendarDays, faGift, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import CalAvailabilityPicker from "@/components/booking/CalAvailabilityPicker"
import type { Service } from "@/lib/services"

type PackageCardProps = {
  service: Service
  index: number
}

const PackageCard = ({ service, index }: PackageCardProps) => {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="group"
      >
        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm hover:shadow-md hover:border-sage/50 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-sage/20 flex items-center justify-center text-sage">
                  <FontAwesomeIcon icon={faGift} />
                </div>
                <span className="text-xs font-medium text-sage uppercase tracking-wider">Package</span>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-text-primary group-hover:text-sage transition-colors mb-2">
                {service.title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} size="sm" className="text-sage" />
                  <span>{service.duration}</span>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>

              {/* What's included */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary mb-3">What&apos;s included:</h4>
                <ul className="space-y-2">
                  {service.included?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <FontAwesomeIcon icon={faCheck} size="sm" className="text-sage mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="md:text-right shrink-0">
              <div className="font-serif text-4xl font-bold text-sage mb-1">{service.priceDisplay}</div>
              <p className="text-xs text-text-secondary mb-4">Save compared to booking individually</p>
              <Button
                onClick={() => setShowCalendar(true)}
                className="w-full md:w-auto bg-sage hover:bg-sage/90 text-white rounded-full px-8"
              >
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                Book Now
              </Button>
            </div>
          </div>
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
                  Select an available date and time for your first session, then proceed to payment. You&apos;ll be able
                  to schedule additional sessions after purchase.
                </p>
                <CalAvailabilityPicker
                  service={service}
                  onSlotSelected={(slot) => {
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

export default PackageCard
