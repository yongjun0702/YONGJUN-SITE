'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useBlog } from '@/components/providers/BlogProvider'
import { motion, AnimatePresence } from 'framer-motion'

export function BlogLoadingOverlay() {
  const { isLoading } = useBlog()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!mounted) return null
  
  return createPortal(
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 z-50 bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <div className="relative pt-24 pb-12 sm:py-24">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl relative">
              <div className="flex relative justify-center">
                <div className="max-w-[48rem] w-full relative">
                  <BlogPostSkeletonContent />
                </div>
                
                <div className="hidden xl:block h-fit" style={{ position: 'absolute', right: '-3rem', top: '0', height: '100%' }}>
                  <div className="w-64 sticky top-24">
                    <TableOfContentsSkeleton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function TableOfContentsSkeleton() {
  return (
    <nav className="text-sm w-64 ml-4 max-h-[calc(100vh-8rem)] overflow-y-auto animate-pulse">
      <div className="h-7 bg-gray-200 dark:bg-muted rounded w-16 mb-4"></div>
      <ul className="space-y-3">
        <li className="pb-1">
          <div className="flex items-center">
            <div className="h-4 bg-gray-200 dark:bg-muted rounded w-full"></div>
          </div>
        </li>
        <li className="ml-4 pb-1">
          <div className="flex items-center">
            <div className="h-3 bg-gray-200 dark:bg-muted rounded w-5/6"></div>
          </div>
        </li>
        <li className="ml-4 pb-1">
          <div className="flex items-center">
            <div className="h-3 bg-gray-200 dark:bg-muted rounded w-4/5"></div>
          </div>
        </li>
        <li className="pb-1">
          <div className="flex items-center">
            <div className="h-4 bg-gray-200 dark:bg-muted rounded w-11/12"></div>
          </div>
        </li>
        <li className="ml-4 pb-1">
          <div className="flex items-center">
            <div className="h-3 bg-gray-200 dark:bg-muted rounded w-3/4"></div>
          </div>
        </li>
        <li className="ml-6 pb-1">
          <div className="flex items-center">
            <div className="h-3 bg-gray-200 dark:bg-muted rounded w-2/3"></div>
          </div>
        </li>
        <li className="pb-1">
          <div className="flex items-center">
            <div className="h-4 bg-gray-200 dark:bg-muted rounded w-10/12"></div>
          </div>
        </li>
      </ul>
    </nav>
  )
}

function BlogPostSkeletonContent() {
  return (
    <div className="w-full animate-pulse">
      <div className="inline-flex items-center mb-6">
        <div className="w-4 h-4 mr-2 bg-gray-200 dark:bg-muted rounded"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-muted rounded"></div>
      </div>
      
      <div className="aspect-[37/20] w-full bg-gray-200 dark:bg-muted rounded-lg mb-6"></div>
      
      <div className="mb-10">
        <div className="mb-4 flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="h-6 px-3 py-1 bg-card border border-border/60 rounded-full"
              style={{ width: `${60 + i * 10}px` }}
            ></div>
          ))}
        </div>
        
        <div className="h-9 sm:h-10 md:h-14 bg-gray-200 dark:bg-muted rounded-lg w-3/4 mb-4"></div>
        <div className="h-9 sm:h-10 bg-gray-200 dark:bg-muted rounded-lg w-1/2 mb-6"></div>
        
        <div className="block mt-8 border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 dark:bg-muted flex items-center justify-center"></div>
            <div className="ml-4 space-y-2">
              <div className="h-5 w-32 bg-gray-200 dark:bg-muted rounded"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 my-8">
        <div className="h-5 bg-gray-200 dark:bg-muted rounded-lg w-11/12 mb-3"></div>
        
        <div className="space-y-3">
          {[1, 0.9, 1, 0.95, 0.85].map((width, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-muted rounded" style={{ width: `${width * 100}%` }}></div>
          ))}
        </div>
        
        <div className="h-5 bg-gray-200 dark:bg-muted rounded-lg w-3/5 mb-3"></div>
        <div className="space-y-3">
          {[1, 0.92, 1, 0.88].map((width, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-muted rounded" style={{ width: `${width * 100}%` }}></div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 pb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-muted flex items-center justify-center"></div>
          <div className="ml-4 space-y-2">
            <div className="h-5 w-24 bg-gray-200 dark:bg-muted rounded"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-muted rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mt-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 h-24">
              <div className="mb-1 h-3 bg-gray-200 dark:bg-muted rounded w-16"></div>
              <div className="flex items-center mt-3">
                <div className="mr-3 w-5 h-5 bg-gray-200 dark:bg-muted rounded"></div>
                <div className="h-5 bg-gray-200 dark:bg-muted rounded w-4/5"></div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 h-24">
              <div className="mb-1 h-3 bg-gray-200 dark:bg-muted rounded w-16 ml-auto"></div>
              <div className="flex items-center justify-end mt-3">
                <div className="h-5 bg-gray-200 dark:bg-muted rounded w-4/5"></div>
                <div className="ml-3 w-5 h-5 bg-gray-200 dark:bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}