"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const mainNavItems = [
  { name: 'Home', href: '#' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
]

const globalNavItems = [
  { name: 'Blog', href: '/blog' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')

  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    
    if (isBlogPage && href.startsWith('#')) {
      window.location.href = '/' + href
      return
    }

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
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08,
        staggerDirection: -1,
        delayChildren: 0.05
      }
    }
  }

  const menuItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      y: 10
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const logoHref = isBlogPage ? '/' : '#'

  return (
    <header
      className='fixed left-0 top-0 z-[100] w-full border-b border-border/40 bg-background/70 backdrop-blur-lg'
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href={logoHref}
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          onClick={(e) => !isBlogPage && handleScrollTo(e, '#')}
        >
          YONGJUN
        </Link>

        <div className="hidden items-center space-x-6 md:flex">
          <nav className="space-x-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={isBlogPage ? '/' + item.href : item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={(e) => !isBlogPage && handleScrollTo(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
            {globalNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith(item.href) 
                    ? 'text-primary font-semibold' 
                    : 'text-muted-foreground'
                }`}
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
            className="md:hidden overflow-hidden border-b border-border/40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <nav className="flex flex-col space-y-1 px-2 pb-3 pt-2 sm:px-3 items-center">
              {mainNavItems.map((item) => (
                <motion.div key={item.name} variants={menuItemVariants} className="w-full">
                  <Link
                    href={isBlogPage ? '/' + item.href : item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-primary text-center"
                    onClick={(e) => !isBlogPage && handleScrollTo(e, item.href)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              {globalNavItems.map((item) => (
                <motion.div key={item.name} variants={menuItemVariants} className="w-full">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-primary text-center ${
                      pathname?.startsWith(item.href) 
                        ? 'text-primary font-semibold' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}