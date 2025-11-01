'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/types/blog'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useBlog } from '@/components/providers/BlogProvider'

export function BlogPostGrid({ posts }: { posts: Post[] }) {
  const { navigateToPost } = useBlog();

  const handleCardClick = (slug: string) => {
    navigateToPost(slug);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => handleCardClick(post.slug)}
        />
      ))}
    </motion.div>
  )
} 

const PostTag = memo(function PostTag({ tag }: { tag: string }) {
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `/blog?tag=${tag}`;
      }}
      className="cursor-pointer bg-card border border-border/60 px-3 py-1 text-xs font-medium rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-105 transition-all duration-200"
    >
      {tag}
    </span>
  );
});

const PostCard = memo(function PostCard({ post, onClick }: { post: Post, onClick: () => void }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.4, ease: "easeOut" }
        }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group flex flex-col h-full cursor-pointer"
    >
      <div className="rounded-lg overflow-hidden border border-border bg-card h-full flex flex-col transition-all duration-200 hover:border-zinc-400/70 dark:hover:border-zinc-500/70 hover:shadow-sm">
        <div className="relative aspect-[37/20] w-full overflow-hidden">
          {post.og_image_url ? (
            <Image
              src={post.og_image_url}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="eager"
              priority={true}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-lg">No Image</span>
            </div>
          )}
        </div>
        
        <div className="px-4 pt-4 pb-3 flex-grow flex flex-col">
          <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-foreground/80 dark:group-hover:text-foreground/90 transition-colors">
            {post.title}
          </h2>
          
          {post.meta_description && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
              {post.meta_description}
            </p>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 mt-auto">
              {post.tags.slice(0, 3).map(tag => (
                <PostTag key={tag} tag={tag} />
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground self-center">+{post.tags.length - 3}</span>
              )}
            </div>
          )}
          
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="text-xs text-muted-foreground">
              {new Date(post.published_at || post.created_at).toLocaleDateString('ko-KR')}
            </div>
            {post.view_count !== undefined && (
                <span className="flex items-center ml-4">
                    조회 {post.view_count.toLocaleString()}
                </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
