import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-section-alt py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-serif text-6xl font-bold text-rose mb-4">404</h1>
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">Page not found</h2>
          <p className="text-text-secondary mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="rounded-full border-border bg-transparent">
              <Link href="javascript:history.back()">
                <FontAwesomeIcon icon={faArrowLeft} size="sm" className="mr-2" />
                Go back
              </Link>
            </Button>
            <Button asChild className="bg-rose hover:bg-terracotta text-white rounded-full">
              <Link href="/">
                <FontAwesomeIcon icon={faHome} size="sm" className="mr-2" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound
