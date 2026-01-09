import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Midwife Dumebi's non-clinical midwifery support services.",
}

const TermsPage = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary mb-8">Terms of Service</h1>
          <p className="text-text-secondary mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">1. Services Provided</h2>
                <p className="text-text-secondary leading-relaxed">
                  Midwife Dumebi provides non-clinical guidance and emotional support services related to pregnancy,
                  birth, and the postnatal period. These services are designed to complement, not replace, the clinical
                  care provided by your healthcare team.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">2. Non-Clinical Disclaimer</h2>
                <p className="text-text-secondary leading-relaxed">
                  The services provided do not constitute medical advice, diagnosis, or treatment. Always consult with
                  your midwife, doctor, or other qualified healthcare provider regarding any medical conditions or
                  concerns. Do not delay seeking medical advice because of information received during our sessions.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">3. Booking and Payment</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Sessions must be paid for in full at the time of booking. Payments are processed securely via Stripe.
                  By completing a purchase, you agree to these terms and confirm that you understand the non-clinical
                  nature of the services.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  All prices are listed in GBP and include VAT where applicable.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                  4. Cancellation and Rescheduling
                </h2>
                <ul className="list-disc list-inside text-text-secondary space-y-2">
                  <li>Sessions may be rescheduled free of charge up to 24 hours before the appointment time.</li>
                  <li>Cancellations made less than 24 hours before the appointment may forfeit the session fee.</li>
                  <li>No-shows will forfeit the session fee.</li>
                  <li>
                    In exceptional circumstances (e.g., medical emergency), please contact me as soon as possible and we
                    will discuss options.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">5. Confidentiality</h2>
                <p className="text-text-secondary leading-relaxed">
                  All information shared during sessions is treated as confidential and will not be shared with third
                  parties without your explicit consent. The only exception is if there are serious concerns about the
                  safety of you or others, which would be discussed with you first where possible.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">6. Intellectual Property</h2>
                <p className="text-text-secondary leading-relaxed">
                  All content, materials, and resources provided are the intellectual property of Midwife Dumebi and may
                  not be reproduced, distributed, or shared without permission.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">7. Limitation of Liability</h2>
                <p className="text-text-secondary leading-relaxed">
                  Midwife Dumebi shall not be liable for any indirect, incidental, special, or consequential damages
                  arising from the use of these services. The total liability shall not exceed the amount paid for the
                  specific service in question.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">8. Changes to Terms</h2>
                <p className="text-text-secondary leading-relaxed">
                  These terms may be updated from time to time. Continued use of the services following any changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">9. Contact</h2>
                <p className="text-text-secondary leading-relaxed">
                  For any questions about these terms, please contact{" "}
                  <a href="mailto:hello@midwifedumebi.com" className="text-rose hover:underline">
                    hello@midwifedumebi.com
                  </a>
                </p>
              </section>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="text-rose hover:underline">
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsPage
