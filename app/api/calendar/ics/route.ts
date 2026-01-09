import { generateICSContent } from "@/lib/calendar"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get("title")
  const start = searchParams.get("start")
  const end = searchParams.get("end")
  const location = searchParams.get("location")
  const description = searchParams.get("description")

  if (!title || !start || !end) {
    return new Response("Missing required parameters: title, start, end", {
      status: 400,
    })
  }

  const icsContent = generateICSContent({
    title,
    startTime: start,
    endTime: end,
    location: location || "Online video call",
    description: description || "",
  })

  return new Response(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${title.replace(/[^a-zA-Z0-9]/g, "-")}.ics"`,
    },
  })
}
