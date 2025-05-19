'use client'

import Link from 'next/link'
import { CustomBadge } from '@/components/ui/CustomBadge'

interface TagLinkProps {
  tag: string
  className?: string
  stopPropagation?: boolean
  noLink?: boolean
}

export function TagLink({ tag, className = '', stopPropagation = false, noLink = false }: TagLinkProps) {
  const badgeContent = (
    <CustomBadge 
      className={`bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors ${className}`}
      borderColorClass="border-border"
    >
      {tag}
    </CustomBadge>
  );

  if (noLink) {
    return badgeContent;
  }

  return (
    <Link 
      href={`/blog?tag=${tag}`}
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
    >
      {badgeContent}
    </Link>
  )
} 