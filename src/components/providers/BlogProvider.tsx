'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type BlogContextType = {
  isLoading: boolean
  startLoading: () => void
  endLoading: () => void
  navigateToPost: (slug: string) => void
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

export function BlogProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const startLoading = useCallback(() => {
    setIsLoading(true)
  }, [])

  const endLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const navigateToPost = useCallback((slug: string) => {
    startLoading()
    router.push(`/blog/${slug}`)
  }, [router, startLoading])

  return (
    <BlogContext.Provider value={{ 
      isLoading, 
      startLoading, 
      endLoading, 
      navigateToPost
    }}>
      {children}
    </BlogContext.Provider>
  )
} 