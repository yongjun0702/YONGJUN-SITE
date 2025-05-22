'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Profile } from '@/lib/supabase/server'

interface AuthorProfileProps {
  href?: string
  profile?: Profile | null
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ 
  href = '/blog',
  profile
}) => {
  const ProfileContent = () => (
    <>
      <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.name || 'Author'}
            width={48}
            height={48}
            className="object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {(profile?.name || 'YJ').slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="ml-3">
        <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
          {profile?.name || 'YONGJUN'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {profile?.description || '프론트엔드 개발자 조용준입니다.'}
        </p>
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