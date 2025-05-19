'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface PostNavigationItem {
  title: string;
  slug: string;
}

interface BlogPostNavigationProps {
  currentPostSlug: string;
  currentPostPublishedAt: string;
}

type SupabasePostLink = {
  slug: string;
  title: string;
  published_at: string;
};

export const BlogPostNavigation: React.FC<BlogPostNavigationProps> = ({ currentPostSlug, currentPostPublishedAt }) => {
  const [prevPost, setPrevPost] = useState<PostNavigationItem | null>(null);
  const [nextPost, setNextPost] = useState<PostNavigationItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchNavigationPosts = async () => {
      if (!currentPostSlug || !currentPostPublishedAt) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const { data: prevPostData } = await supabase
          .from('posts')
          .select('title, slug, published_at')
          .eq('status', 'published')
          .lt('published_at', currentPostPublishedAt)
          .neq('slug', currentPostSlug)
          .order('published_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (prevPostData) {
          setPrevPost({ title: (prevPostData as SupabasePostLink).title, slug: (prevPostData as SupabasePostLink).slug });
        }

        const { data: nextPostData } = await supabase
          .from('posts')
          .select('title, slug, published_at')
          .eq('status', 'published')
          .gt('published_at', currentPostPublishedAt)
          .neq('slug', currentPostSlug)
          .order('published_at', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (nextPostData) {
          setNextPost({ title: (nextPostData as SupabasePostLink).title, slug: (nextPostData as SupabasePostLink).slug });
        }
      } catch (error) {
        console.error('Error fetching navigation posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavigationPosts();
  }, [currentPostSlug, currentPostPublishedAt, supabase]);

  if (isLoading) {
    return (
      <div className="border-t border-gray-200 dark:border-gray-700 pt-10 w-full">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1 h-24 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 animate-pulse"></div>
          <div className="col-span-1 h-24 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!prevPost && !nextPost) return null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-10 w-full">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1">
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group block h-full">
              <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors h-24">
                <div className="mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">이전 포스트</span>
                </div>
                <div className="flex items-center flex-grow">
                  <div className="mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                      <path d="M19 12H5"></path>
                      <path d="m12 19-7-7 7-7"></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 line-clamp-1 overflow-hidden text-ellipsis">
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
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">다음 포스트</span>
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