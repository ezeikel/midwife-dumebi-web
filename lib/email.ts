import { Resend } from "resend"
import nodemailer from "nodemailer"
import { render } from "@react-email/components"
import BookingConfirmationEmail, {
  type BookingConfirmationEmailProps,
} from "@/emails/BookingConfirmationEmail"
import PurchaseConfirmationEmail, {
  type PurchaseConfirmationEmailProps,
} from "@/emails/PurchaseConfirmationEmail"

const isProduction = process.env.NODE_ENV === "production"
const FROM_EMAIL = "Midwife Dumebi <bookings@midwifedumebi.com>"

// Lazy initialization to avoid build-time errors
let _resend: Resend | null = null
let _mailtrapTransport: nodemailer.Transporter | null = null

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured")
    }
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

function getMailtrapTransport(): nodemailer.Transporter {
  if (!_mailtrapTransport) {
    _mailtrapTransport = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.mailtrap.io",
      port: parseInt(process.env.MAIL_PORT || "2525"),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })
  }
  return _mailtrapTransport
}

type SendEmailOptions = {
  to: string
  subject: string
  html: string
  react?: React.ReactElement
}

/**
 * Send an email using Resend in production or Mailtrap in development
 */
async function sendEmail(options: SendEmailOptions) {
  if (isProduction && process.env.RESEND_API_KEY) {
    // Use Resend in production
    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      react: options.react,
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return { id: data?.id, provider: "resend" }
  } else {
    // Use Mailtrap for local development
    const mailtrapTransport = getMailtrapTransport()
    const result = await mailtrapTransport.sendMail({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log("Mailtrap email sent:", result.messageId)
    return { id: result.messageId, provider: "mailtrap" }
  }
}

/**
 * Send a booking confirmation email
 */
export async function sendBookingConfirmation(data: BookingConfirmationEmailProps & { to: string }) {
  const { to, ...emailProps } = data

  const emailComponent = BookingConfirmationEmail(emailProps)
  const html = await render(emailComponent)

  return sendEmail({
    to,
    subject: `Booking Confirmed: ${emailProps.serviceName}`,
    html,
    react: emailComponent,
  })
}

/**
 * Send a purchase confirmation email for digital products
 */
export async function sendPurchaseConfirmation(
  data: PurchaseConfirmationEmailProps & { to: string }
) {
  const { to, ...emailProps } = data

  const emailComponent = PurchaseConfirmationEmail(emailProps)
  const html = await render(emailComponent)

  return sendEmail({
    to,
    subject: `Your Download is Ready: ${emailProps.productName}`,
    html,
    react: emailComponent,
  })
}
