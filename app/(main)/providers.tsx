"use client"

import type { ReactNode } from "react"
import PlausibleProvider from "next-plausible"

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <PlausibleProvider
      domain="www.midwifedumebi.com"
      customDomain="https://plausible.io"
      selfHosted
      scriptProps={{
        src: "https://plausible.io/js/pa-0PRrTT2VBy-lbb4JTUDXh.js",
      }}
    >
      {children}
    </PlausibleProvider>
  )
}
