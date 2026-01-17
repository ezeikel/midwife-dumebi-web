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

export type ContactInquiryEmailProps = {
  customerName: string
  customerEmail: string
  message: string
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
  margin: "0 0 16px",
}

const messageBox = {
  backgroundColor: "#ffffff",
  border: "1px solid #e7d9cc",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0 0",
}

const messageText = {
  color: "#2a1e1a",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
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

const replyButton = {
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
  maxWidth: "200px",
}

export default function ContactInquiryEmail({
  customerName,
  customerEmail,
  message,
}: ContactInquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New inquiry from {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.midwifedumebi.com/logos/md-logo.png"
            width="60"
            height="60"
            alt="Midwife Dumebi"
            style={logo}
          />

          <Heading style={heading}>New Service Inquiry</Heading>

          <Text style={text}>
            Someone needs help choosing a service. Here are the details:
          </Text>

          <Section style={detailsBox}>
            <Text style={detailLabel}>Name</Text>
            <Text style={detailValue}>{customerName}</Text>

            <Text style={detailLabel}>Email</Text>
            <Link href={`mailto:${customerEmail}`} style={linkStyle}>
              {customerEmail}
            </Link>

            <Text style={{ ...detailLabel, marginTop: "16px" }}>Message</Text>
            <div style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </div>
          </Section>

          <Link href={`mailto:${customerEmail}?subject=Re: Your inquiry to Midwife Dumebi`} style={replyButton}>
            Reply to {customerName.split(" ")[0]}
          </Link>

          <Hr style={hr} />

          <Text style={footer}>
            This inquiry was submitted via the services page contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
