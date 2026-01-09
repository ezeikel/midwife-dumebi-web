const CAL_API_URL = process.env.CAL_API_URL || "https://api.cal.com/v2"
const CAL_API_KEY = process.env.CAL_API_KEY

export type CalSlot = {
  time: string
}

export type CalAvailabilityResponse = {
  slots: Record<string, CalSlot[]>
}

export type CalBookingResponse = {
  uid: string
  title: string
  startTime: string
  endTime: string
  attendees: { email: string; name: string }[]
  meetingUrl?: string
  location?: string
  metadata?: {
    videoCallUrl?: string
  }
}

/**
 * Get available slots from Cal.com for a specific event type
 */
export async function getAvailability(
  eventTypeId: string,
  startDate: string,
  endDate: string
): Promise<CalAvailabilityResponse> {
  if (!CAL_API_KEY) {
    throw new Error("CAL_API_KEY is not configured")
  }

  // Ensure dates have time component for Cal.com API
  const startTime = startDate.includes("T") ? startDate : `${startDate}T00:00:00Z`
  const endTime = endDate.includes("T") ? endDate : `${endDate}T23:59:59Z`

  const params = new URLSearchParams({
    eventTypeId,
    startTime,
    endTime,
  })

  const response = await fetch(`${CAL_API_URL}/slots/available?${params}`, {
    headers: {
      Authorization: `Bearer ${CAL_API_KEY}`,
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
    },
    next: { revalidate: 60 }, // Cache for 1 minute
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Cal.com API error:", error)
    throw new Error(`Failed to fetch availability: ${response.status}`)
  }

  const data = await response.json()
  return data.data || { slots: {} }
}

/**
 * Create a booking in Cal.com after successful payment
 */
export async function createBooking(data: {
  eventTypeId: string
  start: string
  name: string
  email: string
  notes?: string
}): Promise<CalBookingResponse> {
  if (!CAL_API_KEY) {
    throw new Error("CAL_API_KEY is not configured")
  }

  const response = await fetch(`${CAL_API_URL}/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CAL_API_KEY}`,
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
    },
    body: JSON.stringify({
      eventTypeId: parseInt(data.eventTypeId, 10),
      start: data.start,
      attendee: {
        name: data.name,
        email: data.email,
        timeZone: "Europe/London",
      },
      metadata: data.notes ? { notes: data.notes } : undefined,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Cal.com booking error:", error)
    throw new Error(`Failed to create booking: ${response.status}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Transform Cal.com availability response to the format expected by the frontend
 */
export function transformAvailability(
  calResponse: CalAvailabilityResponse
): { date: string; slots: { time: string; available: boolean }[] }[] {
  const availability: { date: string; slots: { time: string; available: boolean }[] }[] = []

  for (const [date, slots] of Object.entries(calResponse.slots)) {
    availability.push({
      date,
      slots: slots.map((slot) => ({
        time: new Date(slot.time).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        available: true,
      })),
    })
  }

  return availability.sort((a, b) => a.date.localeCompare(b.date))
}
