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

export type NewsletterWelcomeEmailProps = {
  subscriberName?: string
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

const highlightBox = {
  backgroundColor: "#f5ebe0",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
}

const listItem = {
  color: "#2a1e1a",
  fontSize: "16px",
  lineHeight: "1.8",
  margin: "0",
}

const buttonStyle = {
  backgroundColor: "#c98f88",
  borderRadius: "24px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 28px",
  margin: "24px auto 0",
  maxWidth: "280px",
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

export default function NewsletterWelcomeEmail({
  subscriberName,
}: NewsletterWelcomeEmailProps) {
  const greeting = subscriberName ? `Hi ${subscriberName},` : "Hi there,"

  return (
    <Html>
      <Head />
      <Preview>Welcome to the Midwife Dumebi community!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.midwifedumebi.com/logos/md-logo.png"
            width="50"
            height="94"
            alt="Midwife Dumebi"
            style={logo}
          />

          <Heading style={heading}>Welcome to the Community!</Heading>

          <Text style={text}>{greeting}</Text>

          <Text style={text}>
            Thank you for subscribing! I&apos;m so glad you&apos;re here. You&apos;ve just joined a
            community of parents-to-be who are taking an active role in their pregnancy and birth
            journey.
          </Text>

          <Section style={highlightBox}>
            <Text style={{ ...text, fontWeight: "600", margin: "0 0 12px" }}>
              What you can expect from me:
            </Text>
            <Text style={listItem}>• Evidence-based pregnancy and birth tips</Text>
            <Text style={listItem}>• Guidance on navigating NHS maternity care</Text>
            <Text style={listItem}>• Exclusive resources and guides</Text>
            <Text style={listItem}>• Early access to new services and offerings</Text>
          </Section>

          <Text style={text}>
            In the meantime, feel free to explore my services if you&apos;re looking for
            personalised support with birth planning, understanding your maternity notes, or
            preparing for your journey ahead.
          </Text>

          <Link href="https://www.midwifedumebi.com/services" style={buttonStyle}>
            Explore Services
          </Link>

          <Hr style={hr} />

          <Text style={text}>
            <strong>Have questions?</strong>
          </Text>
          <Text style={text}>
            Simply reply to this email - I read every message and love hearing from you!
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Warm wishes,
            <br />
            Dumebi
          </Text>

          <Text style={{ ...footer, marginTop: "16px" }}>
            Midwife Dumebi | Supporting you on your pregnancy journey
          </Text>

          <Text style={{ ...footer, marginTop: "16px", fontSize: "12px" }}>
            You&apos;re receiving this email because you subscribed to updates from midwifedumebi.com.
            You can{" "}
            <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: "#6b5b53" }}>
              unsubscribe
            </Link>{" "}
            at any time.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
