'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Post } from '@/types/blog'
import { FeaturedImage } from '@/components/blog/ClientImage'
import TableOfContentsWrapper from '@/components/blog/TableOfContentsWrapper'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { BlogPostNavigation } from '@/components/blog/BlogPostNavigation'
import { AuthorProfile } from '@/components/blog/AuthorProfile'
import { TagLink } from '@/components/blog/TagLink'

interface BlogPostClientProps {
  post: Post
  prevPost: any
  nextPost: any
  extractedHeadings: any[]
}

export default function BlogPostClient({ post, prevPost, nextPost, extractedHeadings }: BlogPostClientProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // 컴포넌트가 마운트된 후 상태 업데이트
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  // 컨테이너 애니메이션
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  }
  
  // 자식 요소 애니메이션
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <div className="relative pt-24 pb-12 sm:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl relative">
        <div className="flex justify-center">
          <motion.div 
            className="w-full max-w-2xl"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
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
                <MarkdownRenderer content={post.content || ''} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AuthorProfile 
                  name="YONGJUN" 
                  description="프론트엔드 개발자 조용준입니다." 
                  initials="YJ" 
                  href="/blog"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <BlogPostNavigation prevPost={prevPost} nextPost={nextPost} />
              </motion.div>
            </article>
          </motion.div>
        </div>
                  
        {extractedHeadings.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hidden lg:block fixed top-24 right-[max(0px,calc(50%-40rem))]" 
            style={{ width: '16rem' }}
          >
            <div className="h-fit ml-10">
              <TableOfContentsWrapper headings={extractedHeadings} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 