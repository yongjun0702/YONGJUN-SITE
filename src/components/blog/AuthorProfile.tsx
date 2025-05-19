import React from 'react'
import Link from 'next/link'

interface AuthorProfileProps {
  name: string
  description: string
  initials: string
  href?: string
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ 
  name, 
  description, 
  initials, 
  href = '/blog' 
}) => {
  const ProfileContent = () => (
    <>
      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{initials}</span>
      </div>
      <div className="ml-3">
        <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </>
  )

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 w-full pt-10 pb-10">
      <div className="flex items-start">
        {href ? (
          <Link href={href} className="flex items-center group">
            <ProfileContent />
          </Link>
        ) : (
          <div className="flex items-center">
            <ProfileContent />
          </div>
        )}
      </div>
    </div>
  )
} 