'use client';

import Link from 'next/link';
import React from 'react';

interface AuthorProfileProps {
  name: string;
  description: string;
  initials: string;
  href?: string;
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ 
  name, 
  description, 
  initials,
  href = '/about'
}) => {
  return (
    <div className="mt-12 mb-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-12 w-12 md:h-16 md:w-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">{initials}</span>
        </div>
        <div className="ml-4 md:ml-6">
          <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">{description}</p>
          
          {href && (
            <Link 
              href={href}
              className="mt-2 inline-flex text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              더 알아보기 →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}; 