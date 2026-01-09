import type { Metadata } from "next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import CTAStrip from "@/components/CTAStrip"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about midwifery support services, booking, payments, and what to expect from your session.",
}

const faqCategories = [
  {
    title: "About the Services",
    faqs: [
      {
        question: "What is non-clinical support?",
        answer:
          "Non-clinical support means I provide education, emotional support, and guidance to help you understand your options and feel more confident. I do not provide medical advice, diagnose conditions, or replace your clinical care team. Think of it as having a knowledgeable friend who can help you navigate the system and advocate for yourself.",
      },
      {
        question: "Is this instead of NHS care?",
        answer:
          "Absolutely not. My services complement your NHS care - they don't replace it. I help you understand your options, prepare for appointments, and feel more confident in conversations with your clinical team. Always follow the medical advice of your midwife, doctor, or consultant.",
      },
      {
        question: "Who are these services for?",
        answer:
          "My services are for anyone who wants extra support during their pregnancy or postnatal journey. This includes first-time parents, those with previous difficult experiences, anyone feeling overwhelmed by the maternity system, and those who want to feel more prepared and informed. Partners are also welcome to attend sessions.",
      },
      {
        question: "How do I choose the right service for me?",
        answer:
          "Browse the services page for detailed descriptions of each option. If you're still unsure, feel free to email me and I'll suggest the best option based on your situation. There's no pressure - I want you to feel confident in your choice.",
      },
    ],
  },
  {
    title: "Sessions & Booking",
    faqs: [
      {
        question: "How do video sessions work?",
        answer:
          "After booking, you'll receive a video call link via email. At your appointment time, simply click the link to join our call. You can join from your computer, tablet, or phone. I recommend finding a quiet, comfortable space where you can speak freely.",
      },
      {
        question: "Can my partner join the session?",
        answer:
          "Yes, partners are very welcome to join! Many families find it helpful to have both parents present, especially for birth planning sessions. There's no additional cost for partners to attend.",
      },
      {
        question: "What happens after I pay?",
        answer:
          "After payment, you'll be directed to book your session time using our online calendar. Choose a slot that works for you, and you'll receive a confirmation email with your video call link and any preparation tips. It's that simple!",
      },
      {
        question: "What's your cancellation and reschedule policy?",
        answer:
          "I understand life can be unpredictable, especially during pregnancy! You can reschedule your session up to 24 hours before your appointment at no extra cost. Cancellations made less than 24 hours before or no-shows may forfeit the session fee. Please contact me as soon as possible if you need to make changes.",
      },
      {
        question: "What times are available?",
        answer:
          "I offer sessions on weekdays during daytime hours, with some evening availability. When you book, you'll see all available time slots. If you need a time that isn't showing, please get in touch and I'll do my best to accommodate.",
      },
    ],
  },
  {
    title: "Privacy & Support",
    faqs: [
      {
        question: "Is everything we discuss confidential?",
        answer:
          "Yes, our sessions are completely confidential. I won't share anything you tell me without your explicit consent. The only exception would be if I had serious concerns about your safety or the safety of others, in which case I would discuss this with you first.",
      },
      {
        question: "What if I get upset during the session?",
        answer:
          "It's completely normal and okay to feel emotional during our sessions - many topics we discuss can bring up strong feelings. I provide a safe, non-judgemental space where you can express yourself freely. We can take breaks whenever you need, and I'll support you throughout.",
      },
      {
        question: "Can you provide ongoing support?",
        answer:
          "Yes! While individual sessions are designed to be comprehensive, many people benefit from follow-up sessions or ongoing support. Packages are available for those who want continued guidance, and you can always book additional sessions as needed.",
      },
    ],
  },
  {
    title: "Payment & Packages",
    faqs: [
      {
        question: "How do payments work?",
        answer:
          "Payments are made securely online via Stripe before your session. We accept all major credit and debit cards. Your payment confirms your booking and you'll receive a receipt via email.",
      },
      {
        question: "Are packages better value?",
        answer:
          "Yes, packages offer a discount compared to booking individual sessions separately. They're designed for specific journeys - like birth planning or postnatal support - and include complementary sessions that work well together.",
      },
      {
        question: "Do you offer concessions?",
        answer:
          "I want my services to be accessible. If cost is a barrier for you, please get in touch and we can discuss options. I offer limited concession places and can suggest alternative resources if needed.",
      },
    ],
  },
]

const FAQPage = () => {
  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Everything you need to know about my services and how they work.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-surface rounded-xl border border-border px-6 data-[state=open]:border-blush/50 data-[state=open]:shadow-sm transition-all"
                    >
                      <AccordionTrigger className="text-left font-serif text-base font-medium text-text-primary hover:text-rose py-5 [&[data-state=open]]:text-rose">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-text-secondary leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <div className="bg-surface rounded-2xl p-8 border border-border">
              <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">Still have questions?</h3>
              <p className="text-text-secondary mb-6">
                I&apos;m happy to help. Send me an email and I&apos;ll get back to you within 24 hours.
              </p>
              <Button asChild className="bg-rose hover:bg-terracotta text-white rounded-full px-8">
                <a href="mailto:hello@midwifedumebi.com">
                  <FontAwesomeIcon icon={faEnvelope} size="sm" className="mr-2" />
                  Email me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTAStrip />
    </>
  )
}

export default FAQPage
