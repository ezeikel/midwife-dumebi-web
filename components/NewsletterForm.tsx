"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type NewsletterFormProps = {
  variant?: "default" | "compact" | "hero"
  className?: string
}

const NewsletterForm = ({ variant = "default", className }: NewsletterFormProps) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Placeholder - replace with actual newsletter provider integration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStatus("success")
    setMessage("Thanks for subscribing! Check your inbox for a confirmation email.")
    setEmail("")
    setName("")
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("flex items-center gap-2 text-sage", className)}
      >
        <FontAwesomeIcon icon={faCheck} size="sm" />
        <span className="text-sm">{message}</span>
      </motion.div>
    )
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-surface border-border text-sm"
        />
        <Button type="submit" disabled={status === "loading"} className="bg-rose hover:bg-terracotta text-white">
          {status === "loading" ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : "Join"}
        </Button>
      </form>
    )
  }

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-white/80 border-border"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/80 border-border"
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto bg-rose hover:bg-terracotta text-white rounded-full px-8"
        >
          {status === "loading" ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin size="sm" className="mr-2" />
              Subscribing...
            </>
          ) : (
            "Get a free guide"
          )}
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-surface border-border"
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-surface border-border"
        />
      </div>
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-rose hover:bg-terracotta text-white rounded-full"
      >
        {status === "loading" ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin size="sm" className="mr-2" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  )
}

export default NewsletterForm
