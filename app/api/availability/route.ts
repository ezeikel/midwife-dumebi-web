import { type NextRequest, NextResponse } from "next/server"
import { services } from "@/lib/services"

type TimeSlot = {
  time: string
  datetime: string
  available: boolean
}

type AvailabilityResponse = {
  [date: string]: TimeSlot[]
}

// Helper to generate time slots for a given date
const generateTimeSlotsForDate = (date: Date, serviceDuration: number): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const dayOfWeek = date.getDay()

  // No availability on Sundays
  if (dayOfWeek === 0) return slots

  // Saturday has reduced hours
  const startHour = 9
  const endHour = dayOfWeek === 6 ? 14 : 18

  // Generate slots based on service duration
  const slotDuration = serviceDuration >= 90 ? 120 : 60 // 2hr or 1hr slots

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      if (hour + (minute + slotDuration) / 60 > endHour) break

      const slotDate = new Date(date)
      slotDate.setHours(hour, minute, 0, 0)

      // Skip slots in the past
      if (slotDate <= new Date()) continue

      // Randomly make some slots unavailable (simulating booked slots)
      // In production, this would come from Cal.com API
      const isAvailable = Math.random() > 0.3

      const timeString = slotDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })

      slots.push({
        time: timeString,
        datetime: slotDate.toISOString(),
        available: isAvailable,
      })
    }
  }

  return slots
}

// Parse duration string to minutes
const parseDuration = (durationStr: string): number => {
  const match = durationStr.match(/(\d+)/)
  if (match) {
    if (durationStr.includes("hour")) {
      return Number.parseInt(match[1]) * 60
    }
    return Number.parseInt(match[1])
  }
  return 60 // default 1 hour
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const serviceSlug = searchParams.get("serviceSlug")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  if (!serviceSlug || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  const item = services.find((s) => s.slug === serviceSlug)

  if (!item) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 })
  }

  const duration = parseDuration(item.duration)
  const availability: AvailabilityResponse = {}

  // Generate availability for each date in range
  const start = new Date(startDate)
  const end = new Date(endDate)

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split("T")[0]
    const slots = generateTimeSlotsForDate(new Date(d), duration)
    if (slots.length > 0) {
      availability[dateKey] = slots
    }
  }

  // TODO: In production, call Cal.com API:
  // const calResponse = await fetch(`https://api.cal.com/v1/availability?...`, {
  //   headers: { Authorization: `Bearer ${process.env.CAL_API_KEY}` }
  // })

  return NextResponse.json(availability)
}
