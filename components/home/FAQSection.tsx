"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What is non-clinical support?",
    answer:
      "Non-clinical support means I provide education, emotional support, and guidance to help you understand your options and feel more confident. I do not provide medical advice, diagnose conditions, or replace your clinical care team. Think of it as having a knowledgeable friend who can help you navigate the system and advocate for yourself.",
  },
  {
    question: "How do Zoom sessions work?",
    answer:
      "After booking, you'll receive a Zoom link via email. At your appointment time, simply click the link to join our video call. You can use Zoom on your computer, tablet, or phone. I recommend finding a quiet, comfortable space where you can speak freely.",
  },
  {
    question: "What's your cancellation and reschedule policy?",
    answer:
      "I understand life can be unpredictable, especially during pregnancy! You can reschedule your session up to 24 hours before your appointment at no extra cost. Cancellations made less than 24 hours before or no-shows may forfeit the session fee. Please contact me as soon as possible if you need to make changes.",
  },
  {
    question: "Is this instead of NHS care?",
    answer:
      "Absolutely not. My services complement your NHS care - they don't replace it. I help you understand your options, prepare for appointments, and feel more confident in conversations with your clinical team. Always follow the medical advice of your midwife, doctor, or consultant.",
  },
  {
    question: "Can my partner join the session?",
    answer:
      "Yes, partners are very welcome to join! Many families find it helpful to have both parents present, especially for birth planning sessions. There's no additional cost for partners to attend.",
  },
  {
    question: "Is everything we discuss confidential?",
    answer:
      "Yes, our sessions are completely confidential. I won't share anything you tell me without your explicit consent. The only exception would be if I had serious concerns about your safety or the safety of others, in which case I would discuss this with you first.",
  },
  {
    question: "How do I choose the right service for me?",
    answer:
      "If you're unsure, I'm happy to help! You can browse the services page for detailed descriptions, or get in touch via email and I'll suggest the best option based on your situation. There's no pressure - I want you to feel confident in your choice.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "After payment, you'll be directed to book your session time using our online calendar. Choose a slot that works for you, and you'll receive a confirmation email with your Zoom link and any preparation tips. It's that simple!",
  },
]

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-text-secondary">Everything you need to know before booking.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-surface rounded-xl border border-border px-6 data-[state=open]:border-blush/50 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left font-serif text-base font-medium text-text-primary hover:text-rose py-5 [&[data-state=open]]:text-rose">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary leading-relaxed pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-text-secondary mb-4">Still have questions?</p>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 border-border hover:bg-section-alt bg-transparent"
          >
            <Link href="/faq">View all FAQs</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
