import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Img,
  Link,
} from "@react-email/components"

export type AdminNotificationEventType =
  | "booking"
  | "digital_purchase"
  | "free_guide"

export type AdminNotificationEmailProps = {
  eventType: AdminNotificationEventType
  customerName: string
  customerEmail: string
  itemName: string
  // Optional fields based on event type
  amountPaid?: number // For purchases (in pence)
  date?: string // For bookings
  time?: string // For bookings
  duration?: string // For bookings
  zoomLink?: string // For bookings
}

const EVENT_CONFIG: Record<
  AdminNotificationEventType,
  { title: string; previewPrefix: string; color: string }
> = {
  booking: {
    title: "New Booking Received!",
    previewPrefix: "New booking",
    color: "#8faf9a", // sage
  },
  digital_purchase: {
    title: "New Digital Product Sale!",
    previewPrefix: "New sale",
    color: "#c98f88", // rose
  },
  free_guide: {
    title: "New Free Guide Download!",
    previewPrefix: "New download",
    color: "#d4a574", // terracotta
  },
}

const main = {
  backgroundColor: "#fbf6ef",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  borderRadius: "12px",
  maxWidth: "600px",
}

const heading = {
  color: "#2a1e1a",
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 24px",
}

const text = {
  color: "#2a1e1a",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
}

const detailsBox = {
  backgroundColor: "#f5f0ea",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
}

const detailRow = {
  margin: "0 0 12px",
}

const detailLabel = {
  color: "#6b5b53",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 0 4px",
}

const detailValue = {
  color: "#2a1e1a",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
}

const hr = {
  borderColor: "#e7d9cc",
  margin: "32px 0",
}

const footer = {
  color: "#6b5b53",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
}

const logo = {
  margin: "0 auto 24px",
  display: "block",
}

const linkStyle = {
  color: "#c98f88",
  textDecoration: "underline",
}

export default function AdminNotificationEmail({
  eventType,
  customerName,
  customerEmail,
  itemName,
  amountPaid,
  date,
  time,
  duration,
  zoomLink,
}: AdminNotificationEmailProps) {
  const config = EVENT_CONFIG[eventType]

  const formattedAmount = amountPaid
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amountPaid / 100)
    : null

  const amountBoxStyle = {
    backgroundColor: config.color,
    borderRadius: "8px",
    padding: "16px 24px",
    margin: "16px 0",
    textAlign: "center" as const,
  }

  const amountText = {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0",
  }

  const amountLabel = {
    color: "#ffffff",
    fontSize: "14px",
    margin: "4px 0 0",
    opacity: 0.9,
  }

  const eventBadgeStyle = {
    backgroundColor: config.color,
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 12px",
    borderRadius: "20px",
    display: "inline-block",
    marginBottom: "16px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  }

  const getEventLabel = () => {
    switch (eventType) {
      case "booking":
        return "Session Booking"
      case "digital_purchase":
        return "Digital Product"
      case "free_guide":
        return "Free Guide"
    }
  }

  const getFooterText = () => {
    switch (eventType) {
      case "booking":
        return "This booking has been automatically added to your Cal.com calendar. A confirmation email has been sent to the customer."
      case "digital_purchase":
        return "The customer has been sent an email with their download link."
      case "free_guide":
        return "The customer has been sent an email with their download link. They have also been added to your email list."
    }
  }

  return (
    <Html>
      <Head />
      <Preview>
        {config.previewPrefix}: {itemName} - {customerName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://midwifedumebi.com/images/logo.svg"
            width="150"
            height="40"
            alt="Midwife Dumebi"
            style={logo}
          />

          <div style={{ textAlign: "center" }}>
            <span style={eventBadgeStyle}>{getEventLabel()}</span>
          </div>

          <Heading style={heading}>{config.title}</Heading>

          <Text style={text}>Here are the details:</Text>

          <Section style={detailsBox}>
            <div style={detailRow}>
              <Text style={detailLabel}>Customer</Text>
              <Text style={detailValue}>{customerName}</Text>
            </div>

            <div style={detailRow}>
              <Text style={detailLabel}>Email</Text>
              <Link href={`mailto:${customerEmail}`} style={linkStyle}>
                {customerEmail}
              </Link>
            </div>

            <div style={detailRow}>
              <Text style={detailLabel}>
                {eventType === "booking" ? "Service" : "Product"}
              </Text>
              <Text style={detailValue}>{itemName}</Text>
            </div>

            {/* Booking-specific fields */}
            {eventType === "booking" && date && (
              <div style={detailRow}>
                <Text style={detailLabel}>Date</Text>
                <Text style={detailValue}>{date}</Text>
              </div>
            )}

            {eventType === "booking" && time && (
              <div style={detailRow}>
                <Text style={detailLabel}>Time</Text>
                <Text style={detailValue}>{time}</Text>
              </div>
            )}

            {eventType === "booking" && duration && (
              <div style={detailRow}>
                <Text style={detailLabel}>Duration</Text>
                <Text style={detailValue}>{duration}</Text>
              </div>
            )}
          </Section>

          {/* Amount paid for purchases */}
          {formattedAmount && eventType !== "free_guide" && (
            <Section style={amountBoxStyle}>
              <Text style={amountText}>{formattedAmount}</Text>
              <Text style={amountLabel}>Amount Paid</Text>
            </Section>
          )}

          {/* Zoom link for bookings */}
          {zoomLink && (
            <Text style={text}>
              <strong>Video Call Link:</strong>{" "}
              <Link href={zoomLink} style={linkStyle}>
                {zoomLink}
              </Link>
            </Text>
          )}

          <Hr style={hr} />

          <Text style={footer}>{getFooterText()}</Text>
        </Container>
      </Body>
    </Html>
  )
}
