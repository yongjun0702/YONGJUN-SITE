'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import type { Post } from '@/types/blog'

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

type PopularPost = Pick<Post, 'id' | 'title' | 'slug' | 'tags'>

interface PopularPostsProps {
  popularPosts: PopularPost[]
}

export function PopularPosts({ popularPosts }: PopularPostsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const itemHeight = 36
  const itemGap = 8

  useEffect(() => {
    if (isExpanded || popularPosts.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularPosts.length)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isExpanded, popularPosts.length])

  useEffect(() => {
    if (listRef.current) {
      if (isExpanded) {
        listRef.current.style.transition = 'none'
        listRef.current.style.transform = 'translateY(0px)'
      } else {
        listRef.current.style.transition = 'transform 0.5s ease-in-out'
        listRef.current.style.transform = `translateY(-${currentIndex * itemHeight}px)`
      }
    }
  }, [currentIndex, isExpanded, itemHeight])

  if (!popularPosts || popularPosts.length === 0) {
    return null
  }

  const getFirstTag = (tags: string[] | null | undefined) => {
    if (!tags || !Array.isArray(tags) || tags.length === 0) return null
    return tags.find((tag) => tag !== '전체보기') || tags[0]
  }

  return (
    <section className="mb-8">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">인기 게시물</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full text-muted-foreground hover:bg-muted transition-colors"
            aria-label={isExpanded ? '목록 접기' : '목록 펼치기'}
          >
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <div
          className="transition-[height] duration-300 ease-in-out overflow-hidden"
          style={{
            height: isExpanded
              ? `${popularPosts.length * (itemHeight + itemGap) - itemGap}px`
              : `${itemHeight}px`,
          }}
        >
          <ul
            ref={listRef}
            className={isExpanded ? '' : 'transition-transform duration-500 ease-in-out'}
          >
            {popularPosts.map((post, index) => {
              const firstTag = getFirstTag(post.tags)
              return (
                <li
                  key={post.id}
                  className="h-9"
                  style={{ marginBottom: isExpanded ? `${itemGap}px` : '0' }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center h-full group"
                  >
                    <span className="text-sm font-bold w-6 text-center flex-shrink-0 text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm ml-3 truncate flex-grow text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </span>
                    {firstTag && (
                      <span className="ml-3 text-xs flex-shrink-0 bg-card border border-border/60 text-muted-foreground px-2 py-0.5 rounded-md">
                        {firstTag}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function PopularPostsSkeleton() {
  return (
    <section className="mb-8">
      <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 w-24 bg-muted rounded"></div>
          <div className="h-7 w-7 bg-muted rounded-full"></div>
        </div>
        <div className="h-9">
          <div className="flex items-center h-full">
            <div className="h-5 w-6 bg-muted rounded"></div>
            <div className="h-5 ml-3 flex-grow bg-muted rounded"></div>
            <div className="h-5 ml-3 w-16 bg-muted rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
