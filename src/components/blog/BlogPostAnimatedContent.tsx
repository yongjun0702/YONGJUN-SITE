'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/types/blog';
import { FeaturedImage } from '@/components/blog/ClientImage';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { AuthorProfile } from '@/components/blog/AuthorProfile';
import { TagLink } from '@/components/blog/TagLink';

interface BlogPostAnimatedContentProps {
  post: Post;
  prevPost?: { title: string; slug: string } | null;
  nextPost?: { title: string; slug: string } | null;
  showNavigation?: boolean;
  className?: string;
}

export const containerVariants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: 0.05
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  }
};

const MemoizedMarkdownRenderer = memo(function OptimizedMarkdownRenderer({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
});

export const BlogPostAnimatedContent: React.FC<BlogPostAnimatedContentProps> = ({ 
  post, 
  prevPost,
  nextPost,
  showNavigation = false,
  className = "w-full max-w-2xl" 
}) => {
  return (
    <motion.div 
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <article>
        <motion.div variants={itemVariants}>
          <Link 
            href="/blog" 
            className="inline-flex items-center mb-6 text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            블로그로 돌아가기
          </Link>
        </motion.div>
        
        {post.og_image_url && (
          <motion.div variants={itemVariants}>
            <FeaturedImage src={post.og_image_url} alt={post.title} />
          </motion.div>
        )}
        
        <motion.header className="mb-10" variants={itemVariants}>
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagLink 
                  key={tag}
                  tag={tag}
                  stopPropagation
                />
              ))}
            </div>
          )}
          
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="mt-8 flex items-center border-b border-gray-200 dark:border-gray-700 pb-8">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">YJ</span>
            </div>
            <div className="ml-4">
              <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white">YONGJUN</p>
              <div className="flex text-sm md:text-base text-gray-500 dark:text-gray-400">
                <time dateTime={post.published_at || post.created_at}>
                  {new Date(post.published_at || post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div className="my-8" variants={itemVariants}>
          <MemoizedMarkdownRenderer content={post.content || ''} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <AuthorProfile 
            name="YONGJUN" 
            description="프론트엔드 개발자 조용준입니다." 
            initials="YJ" 
            href="/blog"
          />
        </motion.div>
        
        {showNavigation && (prevPost || nextPost) && (
          <motion.div variants={itemVariants}>
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
          </motion.div>
        )}
      </article>
    </motion.div>
  );
}; 