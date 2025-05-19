import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import type { Post } from '@/types/blog'
import Link from 'next/link'
import { FeaturedImage } from '@/components/blog/ClientImage'
import TableOfContentsWrapper from '@/components/blog/TableOfContentsWrapper'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { extractHeadingsFromMarkdown } from '@/lib/markdown'
import { BlogPostNavigation } from '@/components/blog/BlogPostNavigation'
import { AuthorProfile } from '@/components/blog/AuthorProfile'
import { TagLink } from '@/components/blog/TagLink'
import BlogPostClient from './client-page'
import { Suspense } from 'react'

// 로딩 중 스켈레톤 UI
function BlogPostSkeleton() {
  return (
    <div className="relative pt-24 pb-12 sm:py-24 animate-pulse">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl relative">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-6 h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            
            <div className="aspect-[2/1] w-full bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            
            <div className="mb-10">
              <div className="mb-4 flex gap-2">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              
              <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              
              <div className="mt-8 flex items-center pb-8">
                <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="ml-4 space-y-2">
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4 my-8">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const supabase = await createClient(false);
  const { data: post } = await supabase
    .from('posts')
    .select('title, meta_description, og_image_url, tags')
    .eq('slug', slug)
    .eq('status', 'published')
    .single<Pick<Post, 'title' | 'meta_description' | 'og_image_url' | 'tags'>>()

  if (!post) {
    return { title: '게시물을 찾을 수 없습니다' }
  }

  const pageTitle = post.title;
  const description = post.meta_description || (await parent).description || '개발과 기술, 생각들을 공유합니다.';
  const previousImages = (await parent).openGraph?.images || []
  const keywords = post.tags || [];

  return {
    title: `${pageTitle} | Yongjun Jo`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: pageTitle,
      description: description,
      images: post.og_image_url ? [post.og_image_url, ...previousImages] : previousImages,
      url: `/blog/${slug}`,
      type: 'article',
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description,
      images: post.og_image_url ? [post.og_image_url] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = params;
  const supabase = await createClient(false);

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, published_at, created_at, meta_description, tags, og_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single<Post>()

  if (error || !post) {
    console.error('Error fetching post or post not found:', slug, error);
    notFound();
  }

  let prevPost = null;
  let nextPost = null;
  
  try {
    const { data: prevData } = await supabase
      .from('posts')
      .select('title, slug, og_image_url')
      .eq('status', 'published')
      .lt('published_at', post.published_at || post.created_at)
      .order('published_at', { ascending: false })
      .limit(1)
      .single();
    
    prevPost = prevData;
  } catch (e) {
  }
  
  try {
    const { data: nextData } = await supabase
      .from('posts')
      .select('title, slug, og_image_url')
      .eq('status', 'published')
      .gt('published_at', post.published_at || post.created_at)
      .order('published_at', { ascending: true })
      .limit(1)
      .single();
    
    nextPost = nextData;
  } catch (e) {
  }

  const extractedHeadings = await extractHeadingsFromMarkdown(post.content || '');

  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostClient 
        post={post} 
        prevPost={prevPost} 
        nextPost={nextPost} 
        extractedHeadings={extractedHeadings} 
      />
    </Suspense>
  )
} 