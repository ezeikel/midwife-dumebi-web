"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEnvelope } from "@fortawesome/pro-solid-svg-icons"
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ContactSidebar = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    // Placeholder - connect to email service
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus("success")
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-2xl p-6 border border-border shadow-sm text-center"
      >
        <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center text-sage mx-auto mb-4">
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Message sent!</h3>
        <p className="text-sm text-text-secondary">I&apos;ll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blush/20 flex items-center justify-center text-rose">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <h3 className="font-serif text-lg font-semibold text-text-primary">Need help choosing?</h3>
      </div>

      <p className="text-sm text-text-secondary mb-6">
        Not sure which service is right for you? Send me a message and I&apos;ll help you find the perfect fit.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Textarea
          placeholder="How can I help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="bg-background border-border resize-none"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-rose hover:bg-terracotta text-white rounded-full"
        >
          {status === "loading" ? (
            <>
              <FontAwesomeIcon icon={faSpinnerThird} spin size="sm" className="mr-2" />
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </div>
  )
}

export default ContactSidebar
