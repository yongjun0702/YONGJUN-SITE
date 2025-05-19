'use client'

import { useEffect, useState } from 'react'

interface TocEntry {
  level: number
  id: string
  text: string
}

interface TableOfContentsProps {
  headings: TocEntry[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

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
        rootMargin: '-10% 0% -80% 0%',  
        threshold: 0.1
      }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    if (headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }

    return () => observer.disconnect();
  }, [headings, activeId]);

  if (headings.length === 0) {
    return (
      <nav className="text-sm">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">목차</h3>
        <p className="text-gray-500 dark:text-gray-400">이 게시물에는 목차가 없습니다.</p>
      </nav>
    )
  }

  return (
    <nav className="text-sm">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">목차</h3>
      <ul className="space-y-1.5">
        {headings.map(heading => {
          const isActive = activeId === heading.id;
          let indentClass = '';
          let sizeClass = '';
          
          if (heading.level === 2) {
            sizeClass = 'text-sm font-medium';
          } else if (heading.level === 3) {
            indentClass = 'ml-4';
            sizeClass = 'text-xs';
          } else if (heading.level === 4) {
            indentClass = 'ml-6';
            sizeClass = 'text-xs';
          }
          
          return (
            <li key={heading.id} className={indentClass}>
              <a
                href={`#${heading.id}`}
                className={`
                  block transition-all duration-150 
                  border-l-2 pl-2 py-[3px]
                  ${sizeClass}
                  ${isActive 
                    ? 'border-primary dark:border-primary text-primary dark:text-primary font-medium' 
                    : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'}
                `}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
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