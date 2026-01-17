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

export type UpsellProduct = {
  title: string
  description: string
  price: string
  checkoutUrl: string
}

export type FreeGuideEmailProps = {
  customerName: string
  guideName: string
  downloadLink: string
  upsellProduct?: UpsellProduct
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

const subheading = {
  color: "#2a1e1a",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 16px",
}

const text = {
  color: "#2a1e1a",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
}

const guideBox = {
  backgroundColor: "#f5ebe0",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
}

const guideTitle = {
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

const secondaryButtonStyle = {
  backgroundColor: "#8b9a7c",
  borderRadius: "24px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  margin: "16px auto 0",
  maxWidth: "240px",
}

const upsellBox = {
  backgroundColor: "#fdf8f3",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  border: "1px solid #e7d9cc",
}

const upsellTitle = {
  color: "#2a1e1a",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 8px",
}

const upsellPrice = {
  color: "#c98f88",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
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

export default function FreeGuideEmail({
  customerName,
  guideName,
  downloadLink,
  upsellProduct,
}: FreeGuideEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your free guide is ready - {guideName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.midwifedumebi.com/logos/md-logo.png"
            width="50"
            height="94"
            alt="Midwife Dumebi"
            style={logo}
          />

          <Heading style={heading}>Your Free Guide is Ready!</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            Thank you for signing up! Your free guide is ready to download. I hope you find it
            helpful on your pregnancy journey.
          </Text>

          <Section style={guideBox}>
            <Text style={guideTitle}>{guideName}</Text>
            <Link href={downloadLink} style={buttonStyle}>
              Download Your Guide
            </Link>
          </Section>

          <Text style={text}>
            Click the button above to access your guide. If the button doesn&apos;t work, you can
            copy and paste this link into your browser:
          </Text>

          <Text style={{ ...text, fontSize: "14px", color: "#6b5b53", wordBreak: "break-all" }}>
            {downloadLink}
          </Text>

          {upsellProduct && (
            <>
              <Hr style={hr} />

              <Text style={subheading}>You might also like...</Text>

              <Section style={upsellBox}>
                <Text style={upsellTitle}>{upsellProduct.title}</Text>
                <Text style={upsellPrice}>{upsellProduct.price}</Text>
                <Text style={{ ...text, fontSize: "14px", margin: "0 0 8px" }}>
                  {upsellProduct.description}
                </Text>
                <Link href={upsellProduct.checkoutUrl} style={secondaryButtonStyle}>
                  Learn More
                </Link>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Text style={text}>
            <strong>Need help?</strong>
          </Text>
          <Text style={text}>
            If you have any questions or need support, please reply to this email and I&apos;ll be
            happy to help.
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
            You&apos;re receiving this email because you signed up for a free guide on
            midwifedumebi.com. You can unsubscribe at any time by clicking{" "}
            <Link href="{{unsubscribe_url}}" style={{ color: "#6b5b53" }}>
              here
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
