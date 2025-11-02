import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Post } from '@/types/blog'
import { Suspense } from 'react'
import { BlogPostGrid } from '@/app/blog/BlogPostGrid'
import { Metadata } from 'next'
import { cache } from 'react'
import { PopularPosts, PopularPostsSkeleton } from '@/app/blog/PopularPosts'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Yongjun Jo | 개발과 기술, 생각을 공유합니다.",
  description: "프론트엔드 개발자 조용준의 블로그입니다. 개발과 기술, 생각을 공유합니다.",
  openGraph: {
    title: "Yongjun Jo | 개발과 기술, 생각을 공유합니다.",
    description: "프론트엔드 개발자 조용준의 블로그입니다. 개발과 기술, 생각을 공유합니다.",
    url: "https://yongjun.site/blog",
    images: [
      {
        url: "/images/og_image.png",
        width: 1200,
        height: 600,
        alt: "Yongjun Jo Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yongjun Jo | 개발과 기술, 생각들을 공유합니다.",
    description: "프론트엔드 개발자 조용준의 블로그입니다. 개발과 기술, 생각들을 공유합니다.",
    images: ["/images/og_image.png"],
  },
}

const animationStyles = `
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = animationStyles;
  document.head.appendChild(style);
}

const fetchPosts = cache(async () => {
  const supabase = await createClient(false)
  
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, created_at, meta_description, published_at, status, tags, og_image_url, view_count')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    
  if (error) throw new Error(error.message)
  return data as Post[]
})

const fetchTags = cache(async () => {
  const supabase = await createClient(false)
  
  const { data, error } = await supabase
    .from('posts')
    .select('tags')
    .eq('status', 'published')
    
  if (error) throw new Error(error.message)
  
  const allTags = ['전체보기']
  data?.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag)
        }
      })
    }
  })
  
  return allTags
})

const fetchPopularPosts = cache(async () => {
  const supabase = await createClient(false)
  
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, tags')
    .eq('status', 'published')
    .order('view_count', { ascending: false })
    .limit(5)
    
  if (error) throw new Error(error.message)
  return data as Pick<Post, 'id' | 'title' | 'slug' | 'tags'>[]
})

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const activeTag = (await searchParams).tag || '전체보기'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
      <div className="w-full rounded-lg overflow-hidden mb-8 mt-12 relative bg-card border border-border">
        
        <div className="relative h-32 md:h-48">
          <div className="absolute top-[10%] left-[8%] md:left-1/4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 animate-float"></div>
          <div className="absolute bottom-[10%] right-[8%] md:right-1/4 w-7 h-7 md:w-8 md:h-8 rounded-md bg-primary/30 animate-float-slow"></div>
          
          <div className="absolute top-[40%] left-[30%] md:left-1/3 w-4 h-4 rounded-sm bg-primary/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-[40%] right-[30%] md:right-1/3 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-primary/30 animate-pulse"></div>
          
          <div className="absolute top-[45%] left-[3%] md:left-1/5 w-3 h-3 rounded-full bg-primary/30 animate-bounce"></div>
          <div className="absolute top-[45%] right-[3%] md:right-1/5 w-3 h-3 rounded-md bg-primary/20 animate-float-delayed"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400 mb-2 tracking-tight leading-tight pb-1" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Blog
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              개발과 기술, 생각을 공유합니다.
            </p>
          </div>
        </div>
      </div>
      
      <Suspense fallback={<PopularPostsSkeleton />}>
        <PopularPostsDataWrapper />
      </Suspense>

      <Suspense fallback={<BlogCategoriesLoading />}>
        <BlogCategories activeTag={activeTag} />
      </Suspense>
      
      <Suspense fallback={<BlogPostListSkeleton />}>
        <BlogPosts activeTag={activeTag} />
      </Suspense>
    </div>
  )
}

function BlogCategoriesLoading() {
  return (
    <div className="mb-8 relative">
      <div 
        className="flex whitespace-nowrap overflow-x-auto pb-4 px-2"
        style={{ 
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {['전체보기', '카테고리1', '카테고리2', '카테고리3', '카테고리4'].map((category, index) => (
          <div 
            key={index} 
            className="px-4 py-2 rounded-full bg-card border border-border/60 mr-2 flex-shrink-0"
            style={{ minWidth: '80px', height: '38px' }}
          >
          </div>
        ))}
      </div>
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
    </div>
  )
}

function CategoryLink({ tag, active }: { tag: string; active: boolean }) {
  return (
    <Link 
      href={tag === '전체보기' ? '/blog' : `/blog?tag=${tag}`}
      prefetch={true}
    >
      <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        active
          ? 'bg-primary text-primary-foreground border border-transparent'
          : 'bg-card border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-primary'
      }`}>
        <span className="inline-block">
          {tag}
        </span>
      </div>
    </Link>
  );
}

async function BlogCategories({ activeTag }: { activeTag: string }) {
  const allTags = await fetchTags()
  
  return (
    <div className="mb-8 relative">
      <div 
        className="flex whitespace-nowrap overflow-x-auto px-2"
        style={{ 
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {allTags.map((tag) => (
          <span key={tag} className="flex-shrink-0 mr-2">
            <CategoryLink tag={tag} active={activeTag === tag} />
          </span>
        ))}
      </div>
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
    </div>
  )
}

function BlogPostListSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="group flex flex-col h-full">
            <div className="rounded-lg overflow-hidden border border-border h-full flex flex-col bg-card animate-pulse">
              <div className="relative aspect-[37/20] w-full bg-muted"></div>
              <div className="p-4 flex flex-col h-full">
                <div className="h-7 bg-muted rounded w-3/4 mb-3"></div>
                
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3 mt-auto">
                  {[...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-6 px-3 py-1 rounded-full border border-border/60" 
                      style={{ width: `${50 + Math.random() * 30}px` }}
                    ></div>
                  ))}
                </div>
                
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimpleTags({ tags }: { tags: string[] }) {
  if (!tags || !Array.isArray(tags) || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map(tag => (
        <div key={tag}>
          <div className="bg-card border border-border px-2 py-0.5 text-xs font-medium rounded-md text-muted-foreground hover:bg-muted/50 transition-colors">
            {tag}
          </div>
        </div>
      ))}
    </div>
  );
}

async function BlogPosts({ activeTag }: { activeTag: string }) {
  const posts = await fetchPosts()

  if (!posts || posts.length === 0) {
    return <div className="py-12 text-center">아직 게시된 블로그 글이 없습니다.</div>
  }

  const typedPosts: Post[] = posts;
  
  const filteredPosts = activeTag === '전체보기'
    ? typedPosts
    : typedPosts.filter(post => Array.isArray(post.tags) && post.tags.includes(activeTag))
  
  if (filteredPosts.length === 0) {
    return <div className="py-12 text-center">해당 태그의 게시물이 없습니다.</div>
  }

  return (
    <div>
      <BlogPostGrid posts={filteredPosts} />
    </div>
  )
}


async function PopularPostsDataWrapper() {
  const popularPosts = await fetchPopularPosts()
  return <PopularPosts popularPosts={popularPosts} />
}
