'use client'

import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'
import { contactData } from '@/data/contact'

const heroContent = {
  title: 'Frontend Developer',
  name: '조용준',
  backgroundText: ['DEVELOPER', 'FRONTEND', 'MOBILE', 'WEB'],
}

const mainContentAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    },
  },
}

const textItemAnimation = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const backgroundTextAnimation = {
  initial: { opacity: 0, scale: 1.2 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0, ease: 'easeOut' },
  },
}

const iconListAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
}

const iconFadeInAnimation = { 
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15, 
      ease: "easeOut",
    },
  },
};

const MotionLink = motion.create(Link)

export function HeroSection() {
  return (
    <section
      className='relative flex h-screen min-h-[600px] w-full flex-col items-center justify-center overflow-hidden px-6 md:px-12 lg:px-24 text-center mb-32'
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {heroContent.backgroundText.map((text, index) => {
          const positionClasses = [
            'left-[-3%] top-[10%] text-[15vw] md:text-[12vw] lg:text-[10vw] -rotate-12',
            'right-[-10%] bottom-[3%] text-[18vw] md:text-[15vw] lg:text-[12vw] rotate-6',
            'right-[5%] top-[30%] text-[14vw] md:text-[11vw] lg:text-[9vw] rotate-10',
            'left-[5%] bottom-[25%] text-[16vw] md:text-[13vw] lg:text-[11vw] -rotate-8',
          ]

          return (
            <motion.span
              key={text}
              variants={backgroundTextAnimation}
              initial="initial"
              animate="animate"
              className={`absolute font-black uppercase tracking-tighter text-neutral-300/50 dark:text-neutral-500/15 select-none ${positionClasses[index] || positionClasses[0]}`}
              style={{ lineHeight: '0.8' }}
            >
              {text}
            </motion.span>
          )
        })}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={mainContentAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={textItemAnimation}
          className="mb-2 block text-xl font-medium tracking-tight text-transparent sm:text-2xl md:text-3xl lg:text-3xl bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {heroContent.title}
        </motion.h2>

        <motion.h1
          variants={textItemAnimation}
          className="text-6xl font-black tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-8xl"
        >
          {heroContent.name}
        </motion.h1>

        <motion.div
          variants={iconListAnimation}
          className="mt-8"
        >
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-xs font-medium tracking-widest text-muted-foreground/80 uppercase">
                Contact
              </span>
              <div className="ml-3 mr-3 h-4 w-px bg-muted-foreground/40 sm:mr-4"></div>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4">
              {contactData.map((item) => (
                <MotionLink
                  key={item.name}
                  variants={iconFadeInAnimation}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  title={item.name}
                  className="group transition-all duration-200 ease-in-out hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-neutral-900"
                >
                  <item.IconComponent className="h-5 w-5 text-muted-foreground dark:text-muted-foreground fill-current" />
                </MotionLink>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
