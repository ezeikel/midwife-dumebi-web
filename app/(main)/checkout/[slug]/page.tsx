import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getServiceBySlug, services } from "@/lib/services"
import CheckoutContent from "@/components/checkout/CheckoutContent"
import Loading from "@/components/Loading"

type CheckoutPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () => {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export const generateMetadata = async ({ params }: CheckoutPageProps): Promise<Metadata> => {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: "Service Not Found" }
  }

  return {
    title: `Checkout - ${service.title}`,
    description: `Complete your purchase for ${service.title}. ${service.description}`,
  }
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <Suspense fallback={<Loading />}>
      <CheckoutContent service={service} />
    </Suspense>
  )
}

export default CheckoutPage
