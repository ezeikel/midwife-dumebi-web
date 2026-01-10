import type { ReactNode } from "react"
import "./globals.css"

type Props = {
  children: ReactNode
}

// This is the root layout for Next.js App Router
// The actual HTML structure and providers are in app/(main)/layout.tsx
// This minimal layout just passes children through for the routing to work
export default function RootLayout({ children }: Props) {
  return children
}
