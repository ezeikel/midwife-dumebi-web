import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faHouse } from "@fortawesome/pro-solid-svg-icons"
import { generateBreadcrumbSchema } from "@/lib/seo/json-ld"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.midwifedumebi.com"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  // Build full breadcrumb list with Home
  const fullItems = [{ label: "Home", href: "/" }, ...items]

  // Generate schema
  const schemaItems = fullItems.map((item) => ({
    name: item.label,
    url: item.href ? `${baseUrl}${item.href}` : undefined,
  }))
  const breadcrumbSchema = generateBreadcrumbSchema(schemaItems)

  return (
    <>
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-text-secondary ${className}`}
      >
        <ol className="flex items-center gap-2 flex-wrap">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1
            const isFirst = index === 0

            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="w-3 h-3 text-text-muted"
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-text-primary font-medium"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-rose transition-colors flex items-center gap-1"
                  >
                    {isFirst && (
                      <FontAwesomeIcon icon={faHouse} className="w-3 h-3" />
                    )}
                    <span className={isFirst ? "sr-only sm:not-sr-only" : ""}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
