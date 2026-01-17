"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/pro-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-surface/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/logos/md-logo.svg"
              alt="Midwife Dumebi logo"
              width={26}
              height={48}
              className="h-10 md:h-12 w-auto"
            />
            <span className="text-xl md:text-2xl font-semibold tracking-tight" style={{ color: '#8C8077', fontFamily: 'var(--font-nunito)' }}>
              Midwife Dumebi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-rose relative py-1",
                      pathname === link.href ? "text-rose" : "text-text-secondary",
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-rose rounded-full"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-rose hover:bg-terracotta text-white rounded-full px-6">
              <Link href="/services">Book a session</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-rose transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="flex flex-col gap-2 pt-4 pb-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-3 px-4 rounded-lg text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-blush/20 text-rose"
                          : "text-text-secondary hover:bg-section-alt hover:text-text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Button asChild className="w-full bg-rose hover:bg-terracotta text-white rounded-full">
                    <Link href="/services">Book a session</Link>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header
