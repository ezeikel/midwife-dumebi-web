"use client"

import { useEffect } from "react"

type CalEmbedProps = {
  calLink: string
  name?: string
  email?: string
}

const CalEmbed = ({ calLink, name, email }: CalEmbedProps) => {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script")
    script.src = "https://app.cal.com/embed/embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Extract username and event from calLink
  // Expected format: https://cal.com/midwifedumebi/plan-your-birth
  const calPath = calLink.replace("https://cal.com/", "")

  // Build prefill params
  const prefillParams = new URLSearchParams()
  if (name) prefillParams.set("name", name)
  if (email) prefillParams.set("email", email)

  const embedUrl = `https://cal.com/${calPath}${prefillParams.toString() ? `?${prefillParams.toString()}` : ""}`

  return (
    <div className="min-h-[500px]">
      <iframe
        src={embedUrl}
        title="Book your session"
        className="w-full h-[600px] border-0 rounded-xl"
        allow="camera; microphone; fullscreen"
      />
    </div>
  )
}

export default CalEmbed
