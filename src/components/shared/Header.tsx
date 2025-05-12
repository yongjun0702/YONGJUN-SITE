"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      maxHeight: 0,
    },
    visible: {
      opacity: 1,
      maxHeight: '500px',
    },
    exit: {
      opacity: 0,
      maxHeight: 0,
    }
  }

  return (
    <header
      className='fixed left-0 top-0 z-50 w-full border-b border-border/40 backdrop-blur-lg'
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href="#"
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          onClick={(e) => handleScrollTo(e, '#')}
        >
          YONGJUN
        </Link>

        <div className="hidden items-center space-x-6 md:flex">
          <nav className="space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={(e) => handleScrollTo(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-muted-foreground hover:text-primary hover:bg-accent"
            aria-label="Open mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden backdrop-blur-lg overflow-hidden border-b border-border/40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-primary"
                  onClick={(e) => handleScrollTo(e, item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}