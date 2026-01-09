import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Img,
} from "@react-email/components"

export type BookingConfirmationEmailProps = {
  customerName: string
  serviceName: string
  date: string
  time: string
  duration: string
  zoomLink?: string
  googleCalendarUrl?: string
  outlookCalendarUrl?: string
  icsDownloadUrl?: string
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
  backgroundColor: "#f5ebe0",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
}

const detailRow = {
  display: "flex",
  alignItems: "center",
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

const buttonStyle = {
  backgroundColor: "#8faf9a",
  borderRadius: "24px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 28px",
  margin: "24px 0",
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

const calendarSection = {
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
  textAlign: "center" as const,
}

const calendarTitle = {
  color: "#2a1e1a",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 16px",
}

const calendarButtonsContainer = {
  textAlign: "center" as const,
}

const calendarButton = {
  backgroundColor: "#ffffff",
  border: "1px solid #e7d9cc",
  borderRadius: "20px",
  color: "#2a1e1a",
  fontSize: "13px",
  fontWeight: "500",
  textDecoration: "none",
  padding: "10px 16px",
  margin: "4px",
  display: "inline-block",
}

export default function BookingConfirmationEmail({
  customerName,
  serviceName,
  date,
  time,
  duration,
  zoomLink,
  googleCalendarUrl,
  outlookCalendarUrl,
  icsDownloadUrl,
}: BookingConfirmationEmailProps) {
  const hasCalendarLinks = googleCalendarUrl || outlookCalendarUrl || icsDownloadUrl
  return (
    <Html>
      <Head />
      <Preview>Your booking with Midwife Dumebi is confirmed - {serviceName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://midwifedumebi.com/images/logo.svg"
            width="150"
            height="40"
            alt="Midwife Dumebi"
            style={logo}
          />

          <Heading style={heading}>Booking Confirmed</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            Thank you for booking with me. Your session has been confirmed and I&apos;m looking
            forward to meeting with you.
          </Text>

          <Section style={detailsBox}>
            <div style={detailRow}>
              <div>
                <Text style={detailLabel}>Service</Text>
                <Text style={detailValue}>{serviceName}</Text>
              </div>
            </div>

            <div style={detailRow}>
              <div>
                <Text style={detailLabel}>Date</Text>
                <Text style={detailValue}>{date}</Text>
              </div>
            </div>

            <div style={detailRow}>
              <div>
                <Text style={detailLabel}>Time</Text>
                <Text style={detailValue}>{time}</Text>
              </div>
            </div>

            <div style={detailRow}>
              <div>
                <Text style={detailLabel}>Duration</Text>
                <Text style={detailValue}>{duration}</Text>
              </div>
            </div>
          </Section>

          {zoomLink && (
            <>
              <Text style={text}>Your session will take place via video call:</Text>
              <Link href={zoomLink} style={buttonStyle}>
                Join Video Call
              </Link>
              <Text style={{ ...text, fontSize: "14px", color: "#6b5b53" }}>
                Or copy this link: {zoomLink}
              </Text>
            </>
          )}

          {hasCalendarLinks && (
            <Section style={calendarSection}>
              <Text style={calendarTitle}>Add to your calendar:</Text>
              <div style={calendarButtonsContainer}>
                {googleCalendarUrl && (
                  <Link href={googleCalendarUrl} style={calendarButton}>
                    Google Calendar
                  </Link>
                )}
                {outlookCalendarUrl && (
                  <Link href={outlookCalendarUrl} style={calendarButton}>
                    Outlook
                  </Link>
                )}
                {icsDownloadUrl && (
                  <Link href={icsDownloadUrl} style={calendarButton}>
                    Apple Calendar (.ics)
                  </Link>
                )}
              </div>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={text}>
            <strong>Before your session:</strong>
          </Text>
          <Text style={text}>
            Please find a quiet, comfortable space where you can talk freely. Have any relevant
            notes or documents to hand if you&apos;d like to discuss them.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            If you need to reschedule or have any questions, please reply to this email or contact
            me directly.
          </Text>

          <Text style={footer}>
            Warm wishes,
            <br />
            Dumebi
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
