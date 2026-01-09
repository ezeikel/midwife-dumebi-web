import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getServiceBySlug } from "@/lib/services"
import CheckoutContent from "@/components/checkout/CheckoutContent"

type CheckoutPageProps = {
  params: Promise<{ slug: string }>
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

  return <CheckoutContent service={service} />
}

export default CheckoutPage
