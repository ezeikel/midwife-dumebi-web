import type { Metadata } from "next"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com"

export const metadata: Metadata = {
  title: "Disclaimer | Midwife Dumebi",
  description: "Important disclaimer regarding the non-clinical nature of Midwife Dumebi's support services. Services complement NHS care but do not replace clinical advice.",
  alternates: {
    canonical: `${baseUrl}/disclaimer`,
  },
}

const DisclaimerPage = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary mb-8">Disclaimer</h1>

          {/* Important notice box */}
          <div className="bg-blush/10 rounded-2xl p-6 border border-blush/30 mb-10">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faCircleInfo} className="text-rose mt-1 shrink-0" size="lg" />
              <div>
                <h2 className="font-serif text-xl font-semibold text-text-primary mb-2">Important Notice</h2>
                <p className="text-text-secondary leading-relaxed">
                  The services provided by Midwife Dumebi offer{" "}
                  <strong>non-clinical guidance and emotional support only</strong>. These services do not replace
                  clinical care from qualified healthcare professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">Nature of Services</h2>
              <p className="text-text-secondary leading-relaxed">
                All services, sessions, and resources provided are for educational and emotional support purposes only.
                The information and guidance provided should not be considered as medical advice, diagnosis, or
                treatment.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Not a Substitute for Clinical Care
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                My services are designed to complement, not replace, the care provided by your:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>NHS midwife or community midwifery team</li>
                <li>GP (General Practitioner)</li>
                <li>Obstetrician or consultant</li>
                <li>Other qualified healthcare professionals</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                Always seek the advice of your clinical care team for any medical questions or concerns. Never disregard
                professional medical advice or delay seeking it because of information received during our sessions.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">Emergency Situations</h2>
              <p className="text-text-secondary leading-relaxed">
                If you are experiencing a medical emergency, please contact emergency services immediately by calling
                999, or go to your nearest A&E department. My services are not suitable for emergency situations.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">Individual Circumstances</h2>
              <p className="text-text-secondary leading-relaxed">
                Every pregnancy and birth experience is unique. The information provided in sessions is general in
                nature and may not be applicable to your specific circumstances. Always discuss your individual
                situation with your clinical care team.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">Professional Boundaries</h2>
              <p className="text-text-secondary leading-relaxed">
                While I am an NMC registered midwife and nurse, the services I provide through this platform are outside
                of clinical NHS care. I cannot prescribe medication, perform clinical examinations, order tests, or
                provide clinical diagnoses.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">Acknowledgement</h2>
              <p className="text-text-secondary leading-relaxed">
                By booking and using these services, you acknowledge that you have read and understood this disclaimer,
                and you agree that the services provided are non-clinical in nature.
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

export default DisclaimerPage
