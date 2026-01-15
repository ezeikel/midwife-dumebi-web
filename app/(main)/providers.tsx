"use client"

import type { ReactNode } from "react"
import PlausibleProvider from "next-plausible"

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <PlausibleProvider
      domain="midwifedumebi.com"
      trackOutboundLinks
    >
      {children}
    </PlausibleProvider>
  )
}
