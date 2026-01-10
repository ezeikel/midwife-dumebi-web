"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faCheck, faBook, faExclamationCircle } from "@fortawesome/pro-solid-svg-icons"
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getFreeGuides } from "@/lib/resources"

const freeGuides = getFreeGuides()

const FreeGuidesSection = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleDownload = async () => {
    if (!selectedGuide) return

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/guides/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          guideId: selectedGuide,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send guide. Please try again.")
    }
  }

  const resetForm = () => {
    setStatus("idle")
    setEmail("")
    setName("")
    setSelectedGuide(null)
    setErrorMessage("")
  }

  return (
    <section id="free-guides" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary">Free resources</h2>
          <p className="mt-4 text-text-secondary">
            Helpful guides to support you on your journey. Download instantly, no strings attached.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {freeGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Dialog
                open={selectedGuide === guide.id}
                onOpenChange={(open) => {
                  if (!open) resetForm()
                  else setSelectedGuide(guide.id)
                }}
              >
                <DialogTrigger asChild>
                  <button className="w-full text-left bg-surface rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-sage/50 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-sage/20 flex items-center justify-center text-sage mb-4">
                      <FontAwesomeIcon icon={faBook} size="lg" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-text-primary group-hover:text-sage transition-colors mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{guide.description}</p>
                    <div className="mt-4 flex items-center text-sage text-sm font-medium">
                      <FontAwesomeIcon icon={faDownload} size="sm" className="mr-2" />
                      Get it free
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-surface border-border">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-xl text-text-primary">{guide.title}</DialogTitle>
                    <DialogDescription className="text-text-secondary">
                      Enter your details and we&apos;ll send the guide straight to your inbox.
                    </DialogDescription>
                  </DialogHeader>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center text-sage mx-auto mb-4">
                          <FontAwesomeIcon icon={faCheck} size="xl" />
                        </div>
                        <p className="font-serif text-lg font-semibold text-text-primary mb-2">Check your inbox!</p>
                        <p className="text-sm text-text-secondary">
                          We&apos;ve sent your guide to <strong>{email}</strong>
                        </p>
                      </motion.div>
                    ) : status === "error" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-rose/20 flex items-center justify-center text-rose mx-auto mb-4">
                          <FontAwesomeIcon icon={faExclamationCircle} size="xl" />
                        </div>
                        <p className="font-serif text-lg font-semibold text-text-primary mb-2">Oops!</p>
                        <p className="text-sm text-text-secondary mb-4">{errorMessage}</p>
                        <Button
                          onClick={() => setStatus("idle")}
                          variant="outline"
                          className="rounded-full"
                        >
                          Try again
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleDownload()
                        }}
                        className="space-y-4 pt-4"
                      >
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-background border-border"
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background border-border"
                        />
                        <Button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full bg-sage hover:bg-sage/90 text-white rounded-full"
                        >
                          {status === "loading" ? (
                            <>
                              <FontAwesomeIcon icon={faSpinnerThird} spin size="sm" className="mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon icon={faDownload} size="sm" className="mr-2" />
                              Get my free guide
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-text-secondary text-center">
                          We respect your privacy. Unsubscribe anytime.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        {/* Paid guide promo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="bg-blush/20 rounded-2xl p-6 md:p-8 border border-blush/30 text-center">
            <div className="inline-block px-3 py-1 bg-rose/10 text-rose rounded-full text-sm font-medium mb-4">
              Only £0.99
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-text-primary mb-2">Birth Plan Assist</h3>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              A comprehensive digital guide to help you create a thoughtful, personalised birth plan. Includes
              templates, prompts, and expert guidance.
            </p>
            <Button asChild className="bg-rose hover:bg-terracotta text-white rounded-full px-8">
              <Link href="/checkout/birth-plan-assist">
                Get it now
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FreeGuidesSection
