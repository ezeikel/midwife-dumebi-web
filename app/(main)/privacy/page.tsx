import type { Metadata } from "next"
import Link from "next/link"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com"

export const metadata: Metadata = {
  title: "Privacy Policy | Midwife Dumebi",
  description: "Privacy Policy for Midwife Dumebi - how we collect, use, and protect your personal information under UK GDPR.",
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
}

const PrivacyPage = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary mb-8">Privacy Policy</h1>
          <p className="text-text-secondary mb-8">Last updated: January 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">1. Information We Collect</h2>
              <p className="text-text-secondary leading-relaxed mb-4">We collect information you provide directly:</p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Name and email address when booking a session or signing up for our newsletter</li>
                <li>Payment information (processed securely by Stripe)</li>
                <li>Information shared during sessions (treated as confidential)</li>
                <li>Communication records when you contact us</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>To provide and manage your booked services</li>
                <li>To communicate with you about your appointments</li>
                <li>To send newsletters and resources (with your consent)</li>
                <li>To improve our services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">3. Data Sharing</h2>
              <p className="text-text-secondary leading-relaxed">
                We do not sell or rent your personal information. We may share data with:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4">
                <li>Stripe (payment processing)</li>
                <li>Cal.com (appointment scheduling)</li>
                <li>Email service providers (newsletters)</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">4. Data Security</h2>
              <p className="text-text-secondary leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal data against
                unauthorised access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">5. Your Rights</h2>
              <p className="text-text-secondary leading-relaxed mb-4">Under UK GDPR, you have the right to:</p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request erasure of your data</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">6. Cookies</h2>
              <p className="text-text-secondary leading-relaxed">
                We use essential cookies to ensure the website functions properly. We may also use analytics cookies to
                understand how visitors use our site. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">7. Data Retention</h2>
              <p className="text-text-secondary leading-relaxed">
                We retain personal data only for as long as necessary to fulfil the purposes for which it was collected,
                or as required by law. Session notes are retained for 7 years in line with professional requirements.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">8. Contact</h2>
              <p className="text-text-secondary leading-relaxed">
                For privacy-related enquiries or to exercise your rights, contact us at{" "}
                <a href="mailto:hi@midwifedumebi.com" className="text-rose hover:underline">
                  hi@midwifedumebi.com
                </a>
              </p>
            </section>
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

export default PrivacyPage
