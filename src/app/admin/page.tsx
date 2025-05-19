import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface CountResult {
  count: number | null
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { count: publishedCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id, title, slug, status, published_at, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">대시보드</h1>
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/posts"
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            포스트 관리
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            새 포스트
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-600/10">
          <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">총 게시물</dt>
          <dd className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {(publishedCount || 0) + (draftCount || 0)}
          </dd>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-600/10">
          <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">발행된 게시물</dt>
          <dd className="mt-2 text-3xl font-semibold text-green-600 dark:text-green-400">
            {publishedCount || 0}
          </dd>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-600/10">
          <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">임시 저장 게시물</dt>
          <dd className="mt-2 text-3xl font-semibold text-yellow-600 dark:text-yellow-400">
            {draftCount || 0}
          </dd>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">최근 게시물</h2>
          <Link 
            href="/admin/posts/new" 
            className="text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            새 게시물 작성 →
          </Link>
        </div>
        
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  제목
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  상태
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  작성일
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {recentPosts?.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-md px-2.5 py-0.5 text-xs font-medium ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {post.status === 'published' ? '발행됨' : '임시저장'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 transition-colors mr-3"
                    >
                      편집
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    >
                      보기
                    </Link>
                  </td>
                </tr>
              ))}
              
              {(!recentPosts || recentPosts.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    게시물이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <Link
            href="/admin/posts"
            className="text-sm font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            모든 게시물 보기 →
          </Link>
        </div>
      </div>
    </div>
  )
} 