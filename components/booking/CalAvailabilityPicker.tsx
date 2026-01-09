"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
  faArrowRight,
  faSpinner,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import type { Service } from "@/lib/services"
import useSWR from "swr"

type CalAvailabilityPickerProps = {
  service: Service
  onSlotSelected: (slot: { date: string; time: string; datetime: string }) => void
}

type TimeSlot = {
  time: string
  datetime: string
  available: boolean
}

type AvailabilityData = {
  [date: string]: TimeSlot[]
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch availability")
  return res.json()
}

const CalAvailabilityPicker = ({ service, onSlotSelected }: CalAvailabilityPickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

  // Format dates for API
  const startDate = useMemo(() => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    return start.toISOString().split("T")[0]
  }, [currentMonth])

  const endDate = useMemo(() => {
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    return end.toISOString().split("T")[0]
  }, [currentMonth])

  const { data: availability, isLoading } = useSWR<AvailabilityData>(
    `/api/availability?serviceSlug=${service.slug}&startDate=${startDate}&endDate=${endDate}`,
    fetcher,
    { revalidateOnFocus: false },
  )

  // Get calendar grid data
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Add empty slots for days before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }, [currentMonth])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const isDateAvailable = (date: Date) => {
    if (date < today) return false
    const dateKey = formatDateKey(date)
    return availability?.[dateKey]?.some((slot) => slot.available) ?? false
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot)
  }

  const handleContinue = () => {
    if (selectedDate && selectedSlot) {
      onSlotSelected({
        date: selectedDate.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        time: selectedSlot.time,
        datetime: selectedSlot.datetime,
      })
    }
  }

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    setSelectedDate(null)
    setSelectedSlot(null)
  }

  const goToNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    setSelectedDate(null)
    setSelectedSlot(null)
  }

  const canGoPrevious = currentMonth > new Date(today.getFullYear(), today.getMonth(), 1)

  const slotsForSelectedDate = selectedDate
    ? (availability?.[formatDateKey(selectedDate)]?.filter((s) => s.available) ?? [])
    : []

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-background rounded-xl border border-border p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            disabled={!canGoPrevious}
            className="p-2 rounded-full hover:bg-blush/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous month"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-text-primary" />
          </button>
          <h3 className="font-serif text-lg font-semibold text-text-primary">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-blush/20 transition-colors"
            aria-label="Next month"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-text-primary" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-text-secondary py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-10">
              <FontAwesomeIcon icon={faSpinner} spin className="text-rose text-xl" />
            </div>
          )}
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const isPast = date < today
            const isAvailable = isDateAvailable(date)
            const isSelected = selectedDate?.toDateString() === date.toDateString()
            const isToday = date.toDateString() === today.toDateString()

            return (
              <button
                key={date.toISOString()}
                onClick={() => isAvailable && handleDateSelect(date)}
                disabled={isPast || !isAvailable}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all relative
                  ${isPast ? "text-text-secondary/40 cursor-not-allowed" : ""}
                  ${!isPast && !isAvailable ? "text-text-secondary/60 cursor-not-allowed" : ""}
                  ${isAvailable && !isSelected ? "text-text-primary hover:bg-blush/30 cursor-pointer" : ""}
                  ${isSelected ? "bg-rose text-white shadow-md" : ""}
                  ${isToday && !isSelected ? "ring-2 ring-sage ring-inset" : ""}
                `}
              >
                {date.getDate()}
                {isAvailable && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sage" />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-text-secondary">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded ring-2 ring-sage ring-inset" />
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Time slots */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-background rounded-xl border border-border p-4">
              <h4 className="font-serif font-semibold text-text-primary mb-3">
                Available times for{" "}
                {selectedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              </h4>

              {slotsForSelectedDate.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slotsForSelectedDate.map((slot) => (
                    <button
                      key={slot.datetime}
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                        py-2.5 px-3 rounded-lg text-sm font-medium transition-all
                        ${
                          selectedSlot?.datetime === slot.datetime
                            ? "bg-rose text-white shadow-md"
                            : "bg-blush/20 text-text-primary hover:bg-blush/40"
                        }
                      `}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary text-sm">No available times for this date.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected summary and continue button */}
      <AnimatePresence>
        {selectedSlot && selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-sage/10 rounded-xl border border-sage/30 p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-sage" />
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  {selectedDate.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="text-sm text-text-secondary">at {selectedSlot.time}</p>
              </div>
            </div>
            <Button onClick={handleContinue} className="w-full bg-rose hover:bg-terracotta text-white rounded-full">
              Continue to payment
              <FontAwesomeIcon icon={faArrowRight} size="sm" className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-text-secondary text-center">
        Your booking will only be confirmed after payment is complete.
      </p>
    </div>
  )
}

export default CalAvailabilityPicker
