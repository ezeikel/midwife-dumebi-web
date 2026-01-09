"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleCheck,
  faCalendarDays,
  faEnvelope,
  faVideo,
  faSpinner,
  faArrowRight,
  faCircleXmark,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { verifyStripeSession } from "@/app/actions/verify-session"
import CalEmbed from "@/components/booking/CalEmbed"
import type { Service } from "@/lib/services"
import {
  createCalendarEventData,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  generateICSContent,
} from "@/lib/calendar"

type SessionData = {
  service: Service
  customerEmail: string
  customerName: string
  bookingDate?: string
  bookingTime?: string
  bookingDatetime?: string
}

const BookingSuccessContent = () => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [showBooking, setShowBooking] = useState(false)

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setStatus("error")
        return
      }

      try {
        const data = await verifyStripeSession(sessionId)
        if (data) {
          setSessionData(data)
          setStatus("success")
        } else {
          setStatus("error")
        }
      } catch (error) {
        console.error("Error verifying session:", error)
        setStatus("error")
      }
    }

    verifySession()
  }, [sessionId])

  const hasPreBookedSlot = sessionData?.bookingDate && sessionData?.bookingTime

  // Generate calendar event data when we have a booking
  const calendarEvent = useMemo(() => {
    if (!hasPreBookedSlot || !sessionData?.bookingDatetime || !sessionData?.service) {
      return null
    }

    const durationMinutes = sessionData.service.duration
      ? parseInt(sessionData.service.duration)
      : 60

    return createCalendarEventData({
      serviceName: sessionData.service.title,
      startTime: sessionData.bookingDatetime,
      durationMinutes,
      // Zoom link will be added when Cal.com integration is configured
    })
  }, [hasPreBookedSlot, sessionData])

  const handleDownloadICS = () => {
    if (!calendarEvent) return

    const icsContent = generateICSContent(calendarEvent)
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${sessionData?.service.title.replace(/[^a-zA-Z0-9]/g, "-")}-booking.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-section-alt flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-rose mb-4" />
          <p className="text-text-secondary">Confirming your purchase...</p>
        </motion.div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-section-alt py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="w-20 h-20 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta mx-auto mb-6">
                <FontAwesomeIcon icon={faCircleXmark} size="2x" />
              </div>
              <h1 className="font-serif text-2xl font-semibold text-text-primary mb-4">Something went wrong</h1>
              <p className="text-text-secondary mb-8">
                We couldn&apos;t verify your purchase. If you&apos;ve completed payment, please contact us and
                we&apos;ll help you book your session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="rounded-full border-border bg-transparent">
                  <a href="mailto:hello@midwifedumebi.com">Contact support</a>
                </Button>
                <Button asChild className="bg-rose hover:bg-terracotta text-white rounded-full">
                  <Link href="/services">View services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-section-alt py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center text-sage mx-auto mb-6">
              <FontAwesomeIcon icon={faCircleCheck} size="2x" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-4">
              Thank you for your purchase!
            </h1>
            <p className="text-lg text-text-secondary">
              {hasPreBookedSlot
                ? "Your payment was successful and your booking is confirmed."
                : "Your payment was successful. Now let's book your session time."}
            </p>
          </motion.div>

          {/* Order summary card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm mb-8"
          >
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-6">Order summary</h2>

            <div className="space-y-4 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span className="text-text-secondary">Service</span>
                <span className="font-medium text-text-primary">{sessionData?.service.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Duration</span>
                <span className="text-text-primary">{sessionData?.service.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amount paid</span>
                <span className="font-serif font-bold text-rose">{sessionData?.service.priceDisplay}</span>
              </div>
            </div>

            {hasPreBookedSlot && (
              <div className="py-6 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Your booking</h3>
                <div className="flex items-center gap-3 p-4 bg-sage/10 rounded-xl border border-sage/20">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-sage" size="lg" />
                  <div>
                    <p className="font-medium text-text-primary">{sessionData?.bookingDate}</p>
                    <p className="text-sm text-text-secondary">{sessionData?.bookingTime}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mt-3">
                  You&apos;ll receive a confirmation email with your video call link shortly.
                </p>

                {/* Add to Calendar buttons */}
                {calendarEvent && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faCalendarPlus} className="text-rose" />
                      Add to your calendar
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={generateGoogleCalendarUrl(calendarEvent)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-primary hover:bg-blush/10 hover:border-rose/30 transition-colors"
                      >
                        Google Calendar
                      </a>
                      <a
                        href={generateOutlookCalendarUrl(calendarEvent)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-primary hover:bg-blush/10 hover:border-rose/30 transition-colors"
                      >
                        Outlook
                      </a>
                      <button
                        onClick={handleDownloadICS}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-primary hover:bg-blush/10 hover:border-rose/30 transition-colors"
                      >
                        Apple Calendar (.ics)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-6">
              <h3 className="text-sm font-semibold text-text-primary mb-4">What happens next</h3>
              <div className="space-y-3">
                {!hasPreBookedSlot && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blush/20 flex items-center justify-center text-rose shrink-0">
                      <FontAwesomeIcon icon={faCalendarDays} size="sm" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Book your session time</p>
                      <p className="text-sm text-text-secondary">Choose a date and time that works for you.</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blush/20 flex items-center justify-center text-rose shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} size="sm" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Confirmation email</p>
                    <p className="text-sm text-text-secondary">
                      You&apos;ll receive an email with your video call link and details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blush/20 flex items-center justify-center text-rose shrink-0">
                    <FontAwesomeIcon icon={faVideo} size="sm" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Join your video call</p>
                    <p className="text-sm text-text-secondary">Click the link in your email at your scheduled time.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking section - only show if no pre-booked slot */}
          {!hasPreBookedSlot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8 border-b border-border">
                <h2 className="font-serif text-xl font-semibold text-text-primary mb-2">Book your session</h2>
                <p className="text-text-secondary">
                  Select a date and time below. You&apos;ll receive a confirmation email with your video call link.
                </p>
              </div>

              {!showBooking ? (
                <div className="p-6 md:p-8 text-center">
                  <p className="text-text-secondary mb-6">Click below to open the booking calendar.</p>
                  <Button
                    onClick={() => setShowBooking(true)}
                    className="bg-rose hover:bg-terracotta text-white rounded-full px-8"
                  >
                    <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                    Choose a time
                    <FontAwesomeIcon icon={faArrowRight} size="sm" className="ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <CalEmbed
                    calLink={sessionData?.service.calLink || ""}
                    name={sessionData?.customerName}
                    email={sessionData?.customerEmail}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Help text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-text-secondary mt-8"
          >
            Having trouble booking? Email{" "}
            <a href="mailto:hello@midwifedumebi.com" className="text-rose hover:underline">
              hello@midwifedumebi.com
            </a>{" "}
            and I&apos;ll help you find a time.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccessContent
