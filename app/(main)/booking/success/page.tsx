import type { Metadata } from "next"
import { Suspense } from "react"
import BookingSuccessContent from "@/components/booking/BookingSuccessContent"

export const metadata: Metadata = {
  title: "Booking Confirmation",
  description: "Thank you for your purchase. Book your session time now.",
}

const BookingSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-section-alt flex items-center justify-center">
          <div className="text-text-secondary">Loading...</div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  )
}

export default BookingSuccessPage
