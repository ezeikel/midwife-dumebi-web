"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

type Stat = {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Years NHS experience" },
  { value: 500, suffix: "+", label: "Families supported" },
  { value: 5, suffix: "", label: "Star reviews" },
]

const AnimatedCounter = ({
  value,
  suffix,
  shouldAnimate,
}: {
  value: number
  suffix: string
  shouldAnimate: boolean
}) => {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!shouldAnimate) return

    if (prefersReducedMotion) {
      setCount(value)
      return
    }

    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(increment * currentStep))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [shouldAnimate, value, prefersReducedMotion])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 md:py-20 bg-section-alt" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="font-serif text-5xl md:text-6xl font-bold text-rose">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} shouldAnimate={isInView} />
              </div>
              <p className="mt-2 text-text-secondary font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
