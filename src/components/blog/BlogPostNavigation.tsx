'use client';

import React from 'react';
import Link from 'next/link';

export interface PostNavigationItem {
  title: string;
  slug: string;
}

export interface BlogPostNavigationProps {
  prevPost: PostNavigationItem | null;
  nextPost: PostNavigationItem | null;
  className?: string;
}

export const BlogPostNavigation: React.FC<BlogPostNavigationProps> = ({ 
  prevPost, 
  nextPost,
  className = ""
}) => {
  if (!prevPost && !nextPost) return null;

  return (
    <div className={`border-t border-gray-200 dark:border-gray-700 pt-10 w-full ${className}`}>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1">
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group block h-full">
              <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors h-24">
                <div className="mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors">이전 포스트</span>
                </div>
                <div className="flex items-center flex-grow">
                  <div className="mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                      <path d="M19 12H5"></path>
                      <path d="m12 19-7-7 7-7"></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary line-clamp-1 overflow-hidden text-ellipsis">
                    {prevPost.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}
        </div>
        
        <div className="col-span-1">
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group block h-full">
              <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors h-24">
                <div className="text-right mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors">다음 포스트</span>
                </div>
                <div className="flex items-center justify-end flex-grow">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary line-clamp-1 overflow-hidden text-ellipsis text-right">
                    {nextPost.title}
                  </h3>
                  <div className="ml-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 