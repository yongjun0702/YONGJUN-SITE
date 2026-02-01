'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface TocEntry {
  level: number
  id: string
  text: string
}

interface TableOfContentsProps {
  headings: TocEntry[]
  isMobile?: boolean
}

export default function TableOfContents({ headings, isMobile = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(true)

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      setActiveId(id)
      history.pushState(null, '', `#${id}`)
    }
  }

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-10% 0% -70% 0%',
        threshold: 0.1
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    if (isMobile) return null
    return (
      <nav className="text-sm w-64 ml-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">목차</h3>
        <p className="text-gray-500 dark:text-gray-400">이 게시물에는 목차가 없습니다.</p>
      </nav>
    )
  }

  if (isMobile) {
    return (
      <div className="mb-8 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 border-l-4 border-l-gray-900 dark:border-l-white">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex justify-between items-center text-left font-semibold text-gray-800 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <span>목차</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="px-4 pb-4 space-y-1 pt-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <button
                      onClick={() => handleScrollTo(heading.id)}
                      className={`block w-full text-left py-1.5 text-sm ${
                        heading.level === 3 ? 'pl-3' : heading.level === 4 ? 'pl-6' : ''
                      } ${
                        activeId === heading.id 
                        ? 'text-gray-900 dark:text-white font-bold' 
                        : 'text-gray-600 dark:text-gray-400'
                      } hover:text-gray-900 dark:hover:text-gray-200 transition-colors`}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <nav className="text-sm w-64 ml-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pl-1">
      <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100 uppercase tracking-wider">목차</h3>
      <ul className="space-y-0.5">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          const paddingLeft = heading.level === 2 ? 'pl-4' : heading.level === 3 ? 'pl-8' : 'pl-12'

          return (
            <li key={heading.id}>
              <button
                onClick={() => handleScrollTo(heading.id)}
                className={`
                  block w-full text-left py-1.5 transition-all duration-200 text-sm -ml-[1px] border-l-2
                  ${paddingLeft}
                  ${isActive
                    ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-semibold transform scale-105 origin-left'
                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300'}
                `}
              >
                {heading.text}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
