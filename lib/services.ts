export type Service = {
  id: string
  slug: string
  title: string
  duration: string
  durationMinutes: number
  price: number
  priceDisplay: string
  description: string
  features: string[]
  type: "session" | "package" | "digital"
  calLink: string // Placeholder Cal.com link (empty for digital products)
  calEventTypeId?: string // Cal.com event type ID for API booking
  included?: string[] // For packages
  stripePriceId?: string // Optional Stripe price ID
}

export const services: Service[] = [
  // Digital Products
  {
    id: "birth-plan-assist",
    slug: "birth-plan-assist",
    title: "Birth Plan Assist",
    duration: "Digital guide",
    durationMinutes: 0,
    price: 99,
    priceDisplay: "£0.99",
    description:
      "A comprehensive digital guide to help you create a thoughtful, personalised birth plan. Includes templates, prompts, and expert guidance.",
    features: [
      "Step-by-step birth planning framework",
      "Customisable birth preferences template",
      "Questions to discuss with your care team",
      "Digital download - instant access",
    ],
    type: "digital",
    calLink: "",
    stripePriceId: "price_1IlNPIA5obl98iViOBypvOWy",
  },
  // Individual Sessions
  {
    id: "plan-your-birth",
    slug: "plan-your-birth-with-confidence",
    title: "Plan Your Birth With Confidence",
    duration: "90 mins",
    durationMinutes: 90,
    price: 15000,
    priceDisplay: "£150",
    description:
      "A comprehensive session to help you understand your options and feel prepared for your birth experience.",
    features: [
      "Understanding your NHS birth options",
      "Birth preferences support",
      "Pain relief and intervention choices",
      "Questions to ask your midwife or doctor",
      "Support navigating appointments and decisions",
      "Tools to help you advocate for yourself",
    ],
    type: "session",
    calLink: "https://cal.com/midwifedumebi/plan-your-birth",
    calEventTypeId: "4355842",
  },
  {
    id: "nhs-decisions",
    slug: "support-with-nhs-decisions",
    title: "Support With NHS Decisions & Conversations",
    duration: "60 mins",
    durationMinutes: 60,
    price: 12000,
    priceDisplay: "£120",
    description: "Navigate important conversations with your care team with confidence and clarity.",
    features: [
      "Understanding recommendations from your care team",
      "Exploring options, risks and alternatives",
      "Preparing for important appointments",
      "Support formulating questions",
      "Understanding your rights and informed choice",
    ],
    type: "session",
    calLink: "https://cal.com/midwifedumebi/nhs-decisions",
    calEventTypeId: "4355846",
  },
  {
    id: "maternity-notes",
    slug: "understand-your-maternity-notes",
    title: "Understand Your Maternity Notes",
    duration: "60 mins",
    durationMinutes: 60,
    price: 11000,
    priceDisplay: "£110",
    description: "Make sense of your maternity notes and feel informed about your pregnancy journey.",
    features: [
      "Explanation of medical terms and abbreviations",
      "Making sense of your pregnancy journey",
      "Identifying points to discuss with your care team",
      "Feeling informed and empowered",
    ],
    type: "session",
    calLink: "https://cal.com/midwifedumebi/maternity-notes",
    calEventTypeId: "4355853",
  },
  {
    id: "birth-experience",
    slug: "make-sense-of-your-birth-experience",
    title: "Make Sense of Your Birth or Pregnancy Experience",
    duration: "60 mins",
    durationMinutes: 60,
    price: 12000,
    priceDisplay: "£120",
    description: "A supportive space to process and understand your birth or pregnancy experience.",
    features: [
      "Space to share your story",
      "Emotional support and validation",
      "Understanding events from a systems perspective",
      "Clarifying questions you want answered",
      "Gentle guidance and signposting",
    ],
    type: "session",
    calLink: "https://cal.com/midwifedumebi/birth-experience",
    calEventTypeId: "4355854",
  },
  {
    id: "birth-reflections",
    slug: "prepare-for-nhs-birth-reflections",
    title: "Prepare for Your NHS Birth Reflections Meeting",
    duration: "75 mins",
    durationMinutes: 75,
    price: 14000,
    priceDisplay: "£140",
    description: "Feel calm and prepared for your NHS birth reflections meeting.",
    features: [
      "Organising your thoughts and questions",
      "Understanding what the meeting can offer",
      "Support to advocate for yourself",
      "Feeling calm and prepared",
    ],
    type: "session",
    calLink: "https://cal.com/midwifedumebi/birth-reflections",
    calEventTypeId: "4355855",
  },
  {
    id: "pregnancy-loss-debrief",
    slug: "preparing-for-pregnancy-loss-debrief",
    title: "Preparing for Your Pregnancy Loss Debrief Appointment",
    duration: "75 mins",
    durationMinutes: 75,
    price: 14000,
    priceDisplay: "£140",
    description: "Compassionate support to help you prepare for your pregnancy loss debrief appointment.",
    features: [
      "Understanding what to expect from the appointment",
      "Preparing questions for your consultant and loss midwife",
      "Organising thoughts, concerns and priorities",
      "Emotional support in a safe, non-judgemental space",
      "Guidance on expressing your needs",
      "Signposting to specialist support if needed",
    ],
    type: "session",
    calLink: "https://cal.com/midwifedumebi/pregnancy-loss-debrief",
    calEventTypeId: "4355856",
  },
  // Packages
  {
    id: "informed-birth-package",
    slug: "the-informed-birth-package",
    title: "The Informed Birth Package",
    duration: "2-3 sessions",
    durationMinutes: 150, // Combined duration for first session booking
    price: 32000,
    priceDisplay: "£320",
    description: "A comprehensive package to help you feel fully prepared and confident for your birth.",
    features: [
      "Plan Your Birth With Confidence session",
      "Choice of: Decision Support OR Maternity Notes session",
      "Personalised birth preferences document",
    ],
    included: [
      "Plan Your Birth With Confidence (90 mins)",
      "Decision Support OR Maternity Notes Session (60 mins)",
      "Personalised birth preferences document",
    ],
    type: "package",
    calLink: "https://cal.com/midwifedumebi/informed-birth-package",
    calEventTypeId: "4355863",
  },
  {
    id: "postnatal-clarity-package",
    slug: "the-postnatal-clarity-package",
    title: "The Postnatal Clarity Package",
    duration: "2 sessions",
    durationMinutes: 60, // First session duration
    price: 22500,
    priceDisplay: "£225",
    description: "Support to process your experience and prepare for your reflections meeting.",
    features: [
      "Make Sense of Your Birth or Pregnancy Experience session",
      "Prepare for Your NHS Birth Reflections Meeting session",
    ],
    included: [
      "Make Sense of Your Birth or Pregnancy Experience (60 mins)",
      "Prepare for Your NHS Birth Reflections Meeting (75 mins)",
    ],
    type: "package",
    calLink: "https://cal.com/midwifedumebi/postnatal-clarity-package",
    calEventTypeId: "4355864",
  },
  {
    id: "pregnancy-loss-support-package",
    slug: "pregnancy-loss-support-package",
    title: "Pregnancy Loss Support Package",
    duration: "2 sessions + resources",
    durationMinutes: 60, // First session duration
    price: 26000,
    priceDisplay: "£260",
    description: "Compassionate support through a difficult time, with follow-up resources.",
    features: [
      "Make Sense of Your Birth or Pregnancy Loss Experience session",
      "Preparing for Your Pregnancy Loss Debrief Appointment session",
      "Follow-up resources and signposting",
    ],
    included: [
      "Make Sense of Your Birth or Pregnancy Loss Experience (60 mins)",
      "Preparing for Your Pregnancy Loss Debrief Appointment (75 mins)",
      "Follow-up resources and signposting",
    ],
    type: "package",
    calLink: "https://cal.com/midwifedumebi/pregnancy-loss-package",
    calEventTypeId: "4355865",
  },
]

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug)
}

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id)
}

export const getSessions = (): Service[] => {
  return services.filter((service) => service.type === "session")
}

export const getPackages = (): Service[] => {
  return services.filter((service) => service.type === "package")
}

export const packages = services.filter((service) => service.type === "package")
