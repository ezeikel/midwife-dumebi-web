"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons"
import { getSessions, getPackages } from "@/lib/services"
import ServiceCard from "@/components/services/ServiceCard"
import PackageCard from "@/components/services/PackageCard"
import ContactSidebar from "@/components/services/ContactSidebar"

type Tab = "sessions" | "packages"

const ServicesContent = () => {
  const [activeTab, setActiveTab] = useState<Tab>("sessions")

  const sessions = getSessions()
  const packages = getPackages()

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary">Services</h1>
          <p className="mt-4 text-text-secondary text-lg">
            Choose the support that&apos;s right for you. All sessions are delivered online via video call.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-section-alt rounded-full p-1">
            {(["sessions", "packages"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                  activeTab === tab ? "text-white" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-rose rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto mb-10"
        >
          <div className="flex items-start gap-3 bg-blush/10 rounded-xl p-4 border border-blush/20">
            <FontAwesomeIcon icon={faCircleInfo} className="text-rose mt-0.5 shrink-0" />
            <p className="text-sm text-text-secondary">
              <strong className="text-text-primary">Important:</strong> These services provide non-clinical guidance and
              emotional support only and do not replace clinical care. Always consult with your healthcare provider for
              medical advice.
            </p>
          </div>
        </motion.div>

        {/* Content grid with sidebar */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Services grid */}
          <div>
            <AnimatePresence mode="wait">
              {activeTab === "sessions" ? (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {sessions.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="packages"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-6"
                >
                  {packages.map((pkg, index) => (
                    <PackageCard key={pkg.id} service={pkg} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ContactSidebar />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesContent
