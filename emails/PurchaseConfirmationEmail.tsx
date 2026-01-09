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

export type PurchaseConfirmationEmailProps = {
  customerName: string
  productName: string
  downloadLink: string
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

const productBox = {
  backgroundColor: "#f5ebe0",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
}

const productTitle = {
  color: "#2a1e1a",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 8px",
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

export default function PurchaseConfirmationEmail({
  customerName,
  productName,
  downloadLink,
}: PurchaseConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your download is ready - {productName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://midwifedumebi.com/images/logo.svg"
            width="150"
            height="40"
            alt="Midwife Dumebi"
            style={logo}
          />

          <Heading style={heading}>Thank You for Your Purchase!</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            Thank you for purchasing from Midwife Dumebi. Your digital guide is ready to download.
          </Text>

          <Section style={productBox}>
            <Text style={productTitle}>{productName}</Text>
            <Link href={downloadLink} style={buttonStyle}>
              Download Now
            </Link>
          </Section>

          <Text style={text}>
            Click the button above to access your guide. If the button doesn&apos;t work, you can
            copy and paste this link into your browser:
          </Text>

          <Text style={{ ...text, fontSize: "14px", color: "#6b5b53", wordBreak: "break-all" }}>
            {downloadLink}
          </Text>

          <Hr style={hr} />

          <Text style={text}>
            <strong>Need help?</strong>
          </Text>
          <Text style={text}>
            If you have any questions about using the guide or need support, please reply to this
            email and I&apos;ll be happy to help.
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
        </Container>
      </Body>
    </Html>
  )
}
