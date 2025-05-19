import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import type { Post } from '@/types/blog'
import { Suspense } from 'react'
import PostPageClientLayout from './PostPageClientLayout'

export const revalidate = 60;

function BlogPostSkeleton() {
  return (
    <div className="relative pb-12 animate-pulse">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl relative">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-6 h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="aspect-[2/1] w-full bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="mb-10">
              <div className="mb-4 flex flex-wrap gap-2">
                <div className="h-5 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-md border border-border" style={{ width: '60px' }}></div>
                <div className="h-5 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-md border border-border" style={{ width: '80px' }}></div>
                <div className="h-5 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-md border border-border" style={{ width: '70px' }}></div>
                <div className="h-5 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-md border border-border" style={{ width: '90px' }}></div>
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
            <div className="space-y-6 my-8">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
              <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const awaitedParams = await params;
  const supabase = await createClient(false);
  
  const { data: postMeta } = await supabase
    .from('posts')
    .select('title, meta_description, og_image_url, tags')
    .eq('slug', awaitedParams.slug)
    .eq('status', 'published')
    .single<Pick<Post, 'title' | 'meta_description' | 'og_image_url' | 'tags'>>()

  if (!postMeta) {
    return { title: '게시물을 찾을 수 없습니다' }
  }

  const pageTitle = postMeta.title;
  const description = postMeta.meta_description || (await parent).description || '개발과 기술, 생각들을 공유합니다.';
  const previousImages = (await parent).openGraph?.images || []
  const keywords = postMeta.tags || [];

  const metadataResult = {
    title: `${pageTitle} | Yongjun Jo`,
    description: description,
    keywords: keywords,
    openGraph: {
      title: pageTitle,
      description: description,
      images: postMeta.og_image_url ? [postMeta.og_image_url, ...previousImages] : previousImages,
      url: `/blog/${awaitedParams.slug}`,
      type: 'article',
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description,
      images: postMeta.og_image_url ? [postMeta.og_image_url] : undefined,
    },
  }
  return metadataResult;
}

export default async function PostPage({
  params,
  searchParams,
}: Props) {
  const awaitedParams = await params;
  const supabase = await createClient(false);

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, published_at, created_at, meta_description, tags, og_image_url, status, slug')
    .eq('slug', awaitedParams.slug)
    .eq('status', 'published')
    .single<Post>()

  if (error || !post) {
    console.error('Error fetching post or post not found:', awaitedParams.slug, error);
    notFound();
  }

  return (
    <div className="relative pb-12">
      <Suspense fallback={<BlogPostSkeleton />}>
        <PostPageClientLayout post={post} />
      </Suspense>
    </div>
  );
} 