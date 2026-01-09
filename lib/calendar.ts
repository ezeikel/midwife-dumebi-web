/**
 * Calendar utilities for generating add-to-calendar links
 * Supports Google Calendar, Outlook, and ICS (Apple Calendar)
 */

export type CalendarEventData = {
  title: string
  description: string
  startTime: string // ISO string
  endTime: string // ISO string
  location?: string // Video call link or "Online"
}

/**
 * Format date for Google Calendar (YYYYMMDDTHHmmssZ)
 */
function formatGoogleDate(isoString: string): string {
  return new Date(isoString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
}

/**
 * Format date for ICS (YYYYMMDDTHHmmssZ)
 */
function formatICSDate(isoString: string): string {
  return new Date(isoString).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarUrl(event: CalendarEventData): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    dates: `${formatGoogleDate(event.startTime)}/${formatGoogleDate(event.endTime)}`,
    location: event.location || "Online video call",
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Generate Outlook Calendar URL
 */
export function generateOutlookCalendarUrl(event: CalendarEventData): string {
  const startDate = new Date(event.startTime)
  const endDate = new Date(event.endTime)

  const params = new URLSearchParams({
    subject: event.title,
    body: event.description,
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    location: event.location || "Online video call",
    path: "/calendar/action/compose",
    rru: "addevent",
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

/**
 * Generate ICS file content for Apple Calendar / download
 */
export function generateICSContent(event: CalendarEventData): string {
  // Escape special characters in description
  const escapedDescription = event.description
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")

  const escapedTitle = event.title.replace(/,/g, "\\,").replace(/;/g, "\\;")

  const escapedLocation = (event.location || "Online video call")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Midwife Dumebi//Booking//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${formatICSDate(event.startTime)}
DTEND:${formatICSDate(event.endTime)}
SUMMARY:${escapedTitle}
DESCRIPTION:${escapedDescription}
LOCATION:${escapedLocation}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
}

/**
 * Generate ICS download URL (for use in emails)
 */
export function generateICSDownloadUrl(
  baseUrl: string,
  event: CalendarEventData
): string {
  const params = new URLSearchParams({
    title: event.title,
    start: event.startTime,
    end: event.endTime,
    location: event.location || "Online video call",
    description: event.description,
  })
  return `${baseUrl}/api/calendar/ics?${params.toString()}`
}

/**
 * Create calendar event data from booking details
 */
export function createCalendarEventData(options: {
  serviceName: string
  startTime: string
  durationMinutes: number
  zoomLink?: string
}): CalendarEventData {
  const startDate = new Date(options.startTime)
  const endDate = new Date(startDate.getTime() + options.durationMinutes * 60 * 1000)

  const description = options.zoomLink
    ? `Your ${options.serviceName} session with Midwife Dumebi.\n\nJoin video call: ${options.zoomLink}`
    : `Your ${options.serviceName} session with Midwife Dumebi.\n\nYou will receive a video call link before your session.`

  return {
    title: `${options.serviceName} with Midwife Dumebi`,
    description,
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
    location: options.zoomLink || "Online video call",
  }
}
