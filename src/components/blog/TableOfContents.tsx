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
}

export default function TableOfContents({ headings, isMobile = false }: TableOfContentsProps & { isMobile?: boolean }) {
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            position: entry.boundingClientRect.top
          }));

        if (visibleHeadings.length === 0) return;

        visibleHeadings.sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
        setActiveId(visibleHeadings[0].id);
      },
      {
        rootMargin: '-5% 0% -70% 0%',
        threshold: [0, 0.1, 0.5, 1]
      }
    );

    const observeElements = () => {
      headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
      });
    };

    observeElements();
    setTimeout(observeElements, 200);

    if (headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }

    return () => observer.disconnect();
  }, [headings, activeId]);

  useEffect(() => {
    const handleScroll = () => {
      if (headings.length === 0) return;

      let closestHeading = null;
      let closestDistance = Infinity;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - 100);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestHeading = heading;
        }
      }

      if (closestHeading && closestHeading.id !== activeId) {
        setActiveId(closestHeading.id);
      }
    };

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [headings, activeId, isMobile]);

  if (headings.length === 0) {
    if (isMobile) return null;
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
                {headings.map(heading => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setIsExpanded(false);
                      }}
                      className={`block py-1.5 text-sm ${heading.level === 3 ? 'pl-3' : heading.level === 4 ? 'pl-6' : ''} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <nav className="text-sm w-64 ml-4 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pl-1">
      <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100 uppercase tracking-wider">목차</h3>
      <ul className="space-y-0.5">
        {headings.map(heading => {
          const isActive = activeId === heading.id;

          // Indentation based on level
          const paddingLeft = heading.level === 2 ? 'pl-4' : heading.level === 3 ? 'pl-8' : 'pl-12';

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`
                  block py-1.5 transition-all duration-200 text-sm -ml-[1px] border-l-2
                  ${paddingLeft}
                  ${isActive
                    ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-semibold transform scale-105 origin-left'
                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300'}
                `}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setActiveId(heading.id);
                  history.pushState(null, '', `#${heading.id}`);
                }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  )
} 