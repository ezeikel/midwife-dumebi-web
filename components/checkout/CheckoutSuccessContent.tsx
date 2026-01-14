"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleCheck,
  faEnvelope,
  faDownload,
  faCircleXmark,
} from "@fortawesome/pro-solid-svg-icons"
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons"
import { Button } from "@/components/ui/button"
import { verifyStripeSession } from "@/app/actions/verify-session"
import type { Service } from "@/lib/services"

type SessionData = {
  service: Service
  customerEmail: string
  customerName: string
}

const CheckoutSuccessContent = () => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [sessionData, setSessionData] = useState<SessionData | null>(null)

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

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-section-alt flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <FontAwesomeIcon icon={faSpinnerThird} spin size="2x" className="text-rose mb-4" />
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
                We couldn&apos;t verify your purchase. If you&apos;ve completed payment, please check your email for
                the download link or contact us for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="rounded-full border-border bg-transparent">
                  <a href="mailto:hi@midwifedumebi.com">Contact support</a>
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
        <div className="max-w-2xl mx-auto">
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
              Your payment was successful. Check your email for your download link.
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
                <span className="text-text-secondary">Product</span>
                <span className="font-medium text-text-primary">{sessionData?.service.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amount paid</span>
                <span className="font-serif font-bold text-rose">{sessionData?.service.priceDisplay}</span>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-sm font-semibold text-text-primary mb-4">What happens next</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blush/20 flex items-center justify-center text-rose shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} size="sm" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Check your email</p>
                    <p className="text-sm text-text-secondary">
                      We&apos;ve sent a confirmation email to <strong>{sessionData?.customerEmail}</strong> with your
                      download link.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blush/20 flex items-center justify-center text-rose shrink-0">
                    <FontAwesomeIcon icon={faDownload} size="sm" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Download your guide</p>
                    <p className="text-sm text-text-secondary">
                      Click the link in your email to download your Birth Plan Assist guide as a PDF.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Didn't receive email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blush/10 rounded-2xl p-6 border border-rose/20"
          >
            <h3 className="font-medium text-text-primary mb-2">Didn&apos;t receive your email?</h3>
            <ul className="text-sm text-text-secondary space-y-1 mb-4">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• Wait a few minutes for the email to arrive</li>
            </ul>
            <p className="text-sm text-text-secondary">
              Still having trouble?{" "}
              <a href="mailto:hi@midwifedumebi.com" className="text-rose hover:underline font-medium">
                Contact us
              </a>{" "}
              and we&apos;ll help you get your download.
            </p>
          </motion.div>

          {/* Back to home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Button asChild variant="outline" className="rounded-full border-border bg-transparent">
              <Link href="/">Back to home</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessContent
