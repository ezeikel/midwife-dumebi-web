"use client"

import { useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faClock,
  faCheck,
  faShieldHalved,
  faVideo,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons"
import { startCheckoutSession } from "@/app/actions/stripe"
import type { Service } from "@/lib/services"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type CheckoutContentProps = {
  service: Service
}

const CheckoutContent = ({ service }: CheckoutContentProps) => {
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get("date")
  const selectedTime = searchParams.get("time")
  const selectedDatetime = searchParams.get("datetime")

  const fetchClientSecret = useCallback(() => {
    return startCheckoutSession(service.id, {
      date: selectedDate,
      time: selectedTime,
      datetime: selectedDatetime,
    })
  }, [service.id, selectedDate, selectedTime, selectedDatetime])

  return (
    <section className="min-h-screen bg-section-alt py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-rose transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
            Back to services
          </Link>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-8">
          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:order-2"
          >
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-6">Order summary</h2>

              {/* Service details */}
              <div className="pb-6 border-b border-border">
                <h3 className="font-serif text-lg font-medium text-text-primary mb-2">{service.title}</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                  <FontAwesomeIcon icon={faClock} size="sm" className="text-sage" />
                  <span>{service.duration}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
              </div>

              {selectedDate && selectedTime && (
                <div className="py-6 border-b border-border">
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Selected time:</h4>
                  <div className="flex items-center gap-3 p-3 bg-blush/10 rounded-lg">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-rose" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{selectedDate}</p>
                      <p className="text-xs text-text-secondary">{selectedTime}</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-2">
                    {service.type === "package"
                      ? "This is your first session. You'll schedule additional sessions after purchase."
                      : "Your booking will be confirmed after payment."}
                  </p>
                </div>
              )}

              {/* What's included */}
              <div className="py-6 border-b border-border">
                <h4 className="text-sm font-semibold text-text-primary mb-3">What&apos;s included:</h4>
                <ul className="space-y-2">
                  {(service.included || service.features).slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <FontAwesomeIcon icon={faCheck} size="xs" className="text-sage mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total */}
              <div className="py-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium text-text-primary">{service.priceDisplay}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-text-primary">Total</span>
                  <span className="font-serif text-2xl font-bold text-rose">{service.priceDisplay}</span>
                </div>
              </div>

              {/* Trust signals */}
              <div className="pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-sage" />
                  <span>Secure payment via Stripe</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <FontAwesomeIcon icon={faVideo} className="text-sage" />
                  <span>Session delivered via Zoom</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stripe checkout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:order-1"
          >
            <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h1 className="font-serif text-2xl font-semibold text-text-primary">Complete your purchase</h1>
                <p className="mt-2 text-text-secondary">
                  {selectedDate && selectedTime
                    ? "Your booking will be confirmed after payment."
                    : "After payment, you'll be able to book your session time."}
                </p>
              </div>
              <div className="p-6">
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutContent
