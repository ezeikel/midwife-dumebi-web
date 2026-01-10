import Link from "next/link"
import { cacheLife } from "next/cache"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebookF, faTiktok, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/pro-solid-svg-icons"
import NewsletterForm from "@/components/NewsletterForm"

const getCachedYear = async () => {
  "use cache"
  cacheLife("days")
  return new Date().getFullYear()
}

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
]

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
]

const socialLinks = [
  { href: "https://instagram.com/midwifedumebi", icon: faInstagram, label: "Instagram" },
  { href: "https://tiktok.com/@midwifedumebi", icon: faTiktok, label: "TikTok" },
  { href: "https://facebook.com/midwifedumebi", icon: faFacebookF, label: "Facebook" },
  { href: "https://linkedin.com/in/midwifedumebi", icon: faLinkedinIn, label: "LinkedIn" },
]

const Footer = async () => {
  const year = await getCachedYear()

  return (
    <footer className="bg-section-alt border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-xl font-semibold text-text-primary tracking-tight">
              Midwife Dumebi
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              NHS-experienced midwife offering calm, empowering support for your pregnancy and birth journey.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:bg-blush hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} size="sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-rose transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-rose transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-4">Stay Connected</h3>
            <p className="text-sm text-text-secondary mb-4">
              Get tips, resources, and updates delivered to your inbox.
            </p>
            <NewsletterForm variant="compact" />
            <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
              <FontAwesomeIcon icon={faEnvelope} size="sm" />
              <a href="mailto:hi@midwifedumebi.com" className="hover:text-rose transition-colors">
                hi@midwifedumebi.com
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-text-secondary text-center max-w-3xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> These services provide non-clinical guidance and emotional support only and do
            not replace clinical care. Always consult with your healthcare provider for medical advice.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-secondary">
            &copy; {year} Midwife Dumebi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
