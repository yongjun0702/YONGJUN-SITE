'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Post } from '@/types/blog';
import TableOfContentsWrapper from '@/components/blog/TableOfContentsWrapper';
import { BlogPostAnimatedContent } from '@/components/blog/BlogPostAnimatedContent';

interface PostPageClientLayoutProps {
  post: Post;
}

export default function PostPageClientLayout({ post }: PostPageClientLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative pt-24 pb-12 sm:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl relative">
        <div className="flex relative justify-center">
          <div className="max-w-[48rem] w-full relative" ref={contentRef}>
            <BlogPostAnimatedContent 
              post={post} 
              showNavigation={true}
              className="w-full"
            />
          </div>
          
          <div className="hidden xl:block h-fit" style={{ position: 'absolute', right: '-6rem', top: '0', height: '100%' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-64 sticky top-24"
            >
              <TableOfContentsWrapper postContent={post.content || ''} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 