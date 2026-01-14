import type { Metadata } from "next"
import { Suspense } from "react"
import CheckoutSuccessContent from "@/components/checkout/CheckoutSuccessContent"

export const metadata: Metadata = {
  title: "Purchase Complete",
  description: "Thank you for your purchase. Your download link has been sent to your email.",
}

const CheckoutSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-section-alt flex items-center justify-center">
          <div className="text-text-secondary">Loading...</div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  )
}

export default CheckoutSuccessPage
