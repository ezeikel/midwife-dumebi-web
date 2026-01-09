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

export type NewBookingNotificationEmailProps = {
  customerName: string
  customerEmail: string
  serviceName: string
  date: string
  time: string
  duration: string
  amountPaid: number
  zoomLink?: string
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
  backgroundColor: "#e8f5e9",
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

const amountBox = {
  backgroundColor: "#8faf9a",
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

export default function NewBookingNotificationEmail({
  customerName,
  customerEmail,
  serviceName,
  date,
  time,
  duration,
  amountPaid,
  zoomLink,
}: NewBookingNotificationEmailProps) {
  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amountPaid / 100)

  return (
    <Html>
      <Head />
      <Preview>New booking: {serviceName} - {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://midwifedumebi.com/images/logo.svg"
            width="150"
            height="40"
            alt="Midwife Dumebi"
            style={logo}
          />

          <Heading style={heading}>New Booking Received!</Heading>

          <Text style={text}>
            You have a new booking. Here are the details:
          </Text>

          <Section style={detailsBox}>
            <div style={detailRow}>
              <div>
                <Text style={detailLabel}>Customer</Text>
                <Text style={detailValue}>{customerName}</Text>
              </div>
            </div>

            <div style={detailRow}>
              <div>
                <Text style={detailLabel}>Email</Text>
                <Link href={`mailto:${customerEmail}`} style={linkStyle}>
                  {customerEmail}
                </Link>
              </div>
            </div>

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

          <Section style={amountBox}>
            <Text style={amountText}>{formattedAmount}</Text>
            <Text style={amountLabel}>Amount Paid</Text>
          </Section>

          {zoomLink && (
            <>
              <Text style={text}>
                <strong>Video Call Link:</strong>{" "}
                <Link href={zoomLink} style={linkStyle}>
                  {zoomLink}
                </Link>
              </Text>
            </>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            This booking has been automatically added to your Cal.com calendar.
            A confirmation email has been sent to the customer.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
