import { Resend } from "resend"
import nodemailer from "nodemailer"
import { render } from "@react-email/components"
import BookingConfirmationEmail, {
  type BookingConfirmationEmailProps,
} from "@/emails/BookingConfirmationEmail"
import PurchaseConfirmationEmail, {
  type PurchaseConfirmationEmailProps,
} from "@/emails/PurchaseConfirmationEmail"
import NewBookingNotificationEmail, {
  type NewBookingNotificationEmailProps,
} from "@/emails/NewBookingNotificationEmail"
import FreeGuideEmail, { type FreeGuideEmailProps } from "@/emails/FreeGuideEmail"

const isProduction = process.env.NODE_ENV === "production"
const FROM_EMAIL = "Midwife Dumebi <noreply@notifications.midwifedumebi.com>"

// Admin email addresses to notify on new bookings
const ADMIN_EMAILS = ["dumebiokure@gmail.com", "hi@midwifedumebi.com"]

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

/**
 * Send admin notification emails when a new booking is made
 */
export async function sendAdminBookingNotification(data: NewBookingNotificationEmailProps) {
  const emailComponent = NewBookingNotificationEmail(data)
  const html = await render(emailComponent)

  const results = await Promise.all(
    ADMIN_EMAILS.map((email) =>
      sendEmail({
        to: email,
        subject: `New Booking: ${data.serviceName} - ${data.customerName}`,
        html,
        react: emailComponent,
      })
    )
  )

  return results
}

/**
 * Send a free guide download email
 */
export async function sendFreeGuideEmail(data: FreeGuideEmailProps & { to: string }) {
  const { to, ...emailProps } = data

  const emailComponent = FreeGuideEmail(emailProps)
  const html = await render(emailComponent)

  return sendEmail({
    to,
    subject: `Your Free Guide: ${emailProps.guideName}`,
    html,
    react: emailComponent,
  })
}

/**
 * Add a contact to Resend Audiences for marketing emails
 */
export async function addToResendAudience(email: string, firstName: string, lastName?: string) {
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!isProduction) {
    console.log("[DEV] Would add to Resend Audience:", { email, firstName, lastName, audienceId })
    return { success: true, dev: true }
  }

  if (!audienceId) {
    console.warn("RESEND_AUDIENCE_ID not configured, skipping audience add")
    return { success: false, reason: "no_audience_id" }
  }

  try {
    const resend = getResend()

    const result = await resend.contacts.create({
      audienceId,
      email,
      firstName,
      lastName,
      unsubscribed: false,
    })

    console.log("Added contact to Resend Audience:", { email, result })
    return { success: true, data: result }
  } catch (error) {
    // Handle duplicate contact gracefully
    console.error("Failed to add to Resend Audience:", error)
    return { success: false, error }
  }
}
