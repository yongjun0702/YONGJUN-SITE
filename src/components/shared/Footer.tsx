import Link from 'next/link'
import { contactData } from '@/data/contact'

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background py-6">
      <div className="container mx-auto flex flex-col sm:flex-row max-w-7xl items-center sm:justify-center px-4 md:px-6 space-y-4 sm:space-y-0 sm:relative">
        <p className="text-sm text-muted-foreground text-center">
          © {currentYear} YONGJUN. All rights reserved.
        </p>
        
        <div className="flex items-center gap-3 sm:gap-4 sm:absolute sm:right-4 md:right-6 sm:top-1/2 sm:-translate-y-1/2">
          {contactData.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              title={item.name}
              className="group text-muted-foreground hover:text-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/70 focus:text-primary rounded-full p-1.5"
            >
              <item.IconComponent className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
} 