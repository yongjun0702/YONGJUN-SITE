'use client'

import Link from 'next/link'
import React from 'react'

interface TagLinkProps {
  tag: string
  stopPropagation?: boolean
}

export const TagLink: React.FC<TagLinkProps> = ({ tag, stopPropagation = false }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault()
      e.stopPropagation()
      window.location.href = `/blog?tag=${tag}`
    }
  }

  return (
    <Link 
      href={`/blog?tag=${tag}`}
      onClick={handleClick}
      className="inline-block px-3 py-1 bg-card border border-border/60 text-xs font-medium rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
    >
      {tag}
    </Link>
  )
} 