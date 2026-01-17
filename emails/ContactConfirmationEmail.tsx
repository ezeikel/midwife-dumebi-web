import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Hr,
  Img,
} from "@react-email/components"

export type ContactConfirmationEmailProps = {
  customerName: string
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
  padding: "20px",
  margin: "24px 0",
  textAlign: "center" as const,
}

const highlightText = {
  color: "#2a1e1a",
  fontSize: "15px",
  lineHeight: "1.6",
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

export default function ContactConfirmationEmail({
  customerName,
}: ContactConfirmationEmailProps) {
  const firstName = customerName.split(" ")[0]

  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out - I&apos;ll be in touch soon!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.midwifedumebi.com/logos/md-logo.png"
            width="60"
            height="60"
            alt="Midwife Dumebi"
            style={logo}
          />

          <Heading style={heading}>Thanks for Reaching Out!</Heading>

          <Text style={text}>Hi {firstName},</Text>

          <Text style={text}>
            Thank you for getting in touch. I&apos;ve received your message and will get back to you
            as soon as possible.
          </Text>

          <div style={highlightBox}>
            <Text style={highlightText}>
              I typically respond within <strong>24 hours</strong>
            </Text>
          </div>

          <Text style={text}>
            In the meantime, feel free to browse my services or check out some free resources that
            might be helpful.
          </Text>

          <Link href="https://www.midwifedumebi.com/services" style={buttonStyle}>
            View Services
          </Link>

          <Hr style={hr} />

          <Text style={footer}>
            Warm wishes,
            <br />
            Dumebi
          </Text>

          <Text style={{ ...footer, marginTop: "16px" }}>
            Midwife Dumebi | Supporting you on your pregnancy journey
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
