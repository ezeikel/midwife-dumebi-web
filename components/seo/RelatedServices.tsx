import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faArrowRight } from "@fortawesome/pro-solid-svg-icons"
import { services, type Service } from "@/lib/services"
import { type BlogCategory } from "@/lib/blog"

// Map blog categories to relevant service IDs
const categoryToServices: Record<BlogCategory, string[]> = {
  "birth-planning": ["plan-your-birth", "informed-birth-package", "birth-plan-assist"],
  "nhs-support": ["nhs-decisions", "maternity-notes", "plan-your-birth"],
  "emotional-wellbeing": ["birth-experience", "birth-reflections", "postnatal-clarity-package"],
  "postnatal": ["birth-experience", "birth-reflections", "postnatal-clarity-package"],
  "resources": ["plan-your-birth", "nhs-decisions", "birth-plan-assist"],
  "pain-relief": ["plan-your-birth", "nhs-decisions", "informed-birth-package"],
  "labour-and-birth": ["plan-your-birth", "informed-birth-package", "nhs-decisions"],
  "breastfeeding-and-feeding": ["postnatal-clarity-package", "birth-experience", "maternity-notes"],
  "baby-care": ["postnatal-clarity-package", "birth-experience", "nhs-decisions"],
}

// Fallback services if category not found
const defaultServices = ["plan-your-birth", "nhs-decisions", "birth-plan-assist"]

type RelatedServicesProps = {
  category: BlogCategory
  maxServices?: number
  title?: string
  subtitle?: string
}

const RelatedServices = ({
  category,
  maxServices = 3,
  title = "Related Services",
  subtitle = "These services might help with what you're reading about",
}: RelatedServicesProps) => {
  // Get service IDs for this category
  const serviceIds = categoryToServices[category] || defaultServices

  // Get actual service objects, limited to maxServices
  const relatedServices = serviceIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is Service => s !== undefined)
    .slice(0, maxServices)

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-semibold text-text-primary">{title}</h2>
            <p className="mt-2 text-text-secondary">{subtitle}</p>
          </div>

          <div className="grid gap-4">
            {relatedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group bg-surface rounded-xl p-5 border border-border hover:border-blush/50 hover:shadow-sm transition-all flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg font-semibold text-text-primary group-hover:text-rose transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-1 mt-1">{service.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                    {service.durationMinutes > 0 && (
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} size="sm" />
                        {service.duration}
                      </span>
                    )}
                    <span className="font-medium text-rose">{service.priceDisplay}</span>
                  </div>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-full bg-blush/20 flex items-center justify-center text-rose group-hover:bg-rose group-hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-rose hover:text-terracotta transition-colors font-medium"
            >
              View all services
              <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RelatedServices
