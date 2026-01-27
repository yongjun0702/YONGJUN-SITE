'use client';

import React, { useEffect, useState, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Post } from '@/types/blog';
import TableOfContentsWrapper from '@/components/blog/TableOfContentsWrapper';
import { BlogPostAnimatedContent } from '@/components/blog/BlogPostAnimatedContent';
import { useBlog } from '@/components/providers/BlogProvider';

interface PostPageClientLayoutProps {
  post: Post;
  prevPost?: { title: string; slug: string } | null;
  nextPost?: { title: string; slug: string } | null;
}

const MemoizedTOC = memo(function TOC({ postContent, isMobile }: { postContent: string, isMobile?: boolean }) {
  return <TableOfContentsWrapper postContent={postContent} isMobile={isMobile} />;
});

export default function PostPageClientLayout({ post, prevPost, nextPost }: PostPageClientLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { endLoading } = useBlog();

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setIsLoaded(true);
      endLoading();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [endLoading]);

  return (
    <div className="relative pt-24 pb-12 sm:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl relative">
        <div className="flex relative justify-center">
          <div className="max-w-[48rem] w-full min-h-[60vh]" ref={contentRef}>
            <AnimatePresence>
              {visible && (
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <BlogPostAnimatedContent
                    post={post}
                    prevPost={prevPost}
                    nextPost={nextPost}
                    showNavigation={true}
                    className="w-full"
                    beforeContent={
                      <div className="block xl:hidden">
                        <MemoizedTOC postContent={post.content || ''} isMobile={true} />
                      </div>
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="hidden xl:block absolute top-0 left-1/2 ml-[26rem] h-full"
          >
            <div className="sticky top-24 w-64">
              <MemoizedTOC postContent={post.content || ''} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 