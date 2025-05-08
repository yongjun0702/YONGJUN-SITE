'use client'

import Link from 'next/link'
import { contactData } from '@/data/contact'

export function ContactSection() {
  return (
    <section id="contact" className="w-full bg-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-xl px-4 md:px-6">
        <div className="md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            연락처
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            궁금한 점이나 나누고 싶은 이야기가 있다면,
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8">
            언제든지 편하게 연락주세요.
          </h2>
        </div>

        <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
          {contactData.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              title={item.name} // Shows platform name on hover for accessibility
              className="group p-2 rounded-full text-muted-foreground hover:text-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/70 focus:text-primary"
            >
              <item.IconComponent className="h-6 w-6 sm:h-7 sm:w-7" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Interface removed as it's defined in contact.ts and not directly used here for props 