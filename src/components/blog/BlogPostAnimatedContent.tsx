'use client';

import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/types/blog';
import { FeaturedImage } from '@/components/blog/ClientImage';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { AuthorProfile } from '@/components/blog/AuthorProfile';
import { TagLink } from '@/components/blog/TagLink';
import { BlogPostNavigation } from '@/components/blog/BlogPostNavigation';
import { getAuthorProfile, type Profile } from '@/lib/profile';

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
      staggerChildren: 0.02, 
      delayChildren: 0
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.15,
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
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getAuthorProfile();
      if (data) {
        setProfile(data);
      }
    }

    fetchProfile();
  }, []);

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
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          
          {profile && (
            <div className="mt-8 border-b border-gray-200 dark:border-gray-700 pb-8">
              <Link href="/blog" className="flex items-center group">
                <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || 'Author'}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {(profile.name || '').slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {profile.name}
                  </p>
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
              </Link>
            </div>
          )}
        </motion.header>

        <motion.div className="my-8" variants={itemVariants}>
          <MemoizedMarkdownRenderer content={post.content || ''} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {profile && <AuthorProfile href="/blog" profile={profile} />}
        </motion.div>
        
        {showNavigation && (prevPost || nextPost) && (
          <motion.div variants={itemVariants}>
            <BlogPostNavigation 
              prevPost={prevPost || null} 
              nextPost={nextPost || null} 
            />
          </motion.div>
        )}
      </article>
    </motion.div>
  );
}; 