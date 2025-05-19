'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Post } from '@/types/blog'

export default function PostsAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const fetchPosts = async () => {
    setLoading(true)
    
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (filter !== 'all') {
      query = query.eq('status', filter)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data || [])
    }
    
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      return
    }
    
    setLoading(true)
    const { error } = await supabase.from('posts').delete().eq('id', id)
    
    if (error) {
      console.error('Error deleting post:', error)
      alert('게시물 삭제 중 오류가 발생했습니다.')
    } else {
      // 목록 다시 불러오기
      fetchPosts()
    }
  }

  const handleStatusChange = async (id: string, status: 'published' | 'draft') => {
    setLoading(true)
    
    const { error } = await supabase
      .from('posts')
      .update({ 
        status,
        ...(status === 'published' ? { published_at: new Date().toISOString() } : {})
      })
      .eq('id', id)
    
    if (error) {
      console.error('Error updating post status:', error)
      alert('게시물 상태 변경 중 오류가 발생했습니다.')
    } else {
      // 목록 다시 불러오기
      fetchPosts()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">포스트 관리</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
        >
          새 포스트
        </Link>
      </div>
      
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setFilter('all')}
          className={`py-4 text-sm font-medium ${
            filter === 'all'
              ? 'border-b-2 border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
              : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`py-4 text-sm font-medium ${
            filter === 'published'
              ? 'border-b-2 border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
              : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
          }`}
        >
          발행됨
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`py-4 text-sm font-medium ${
            filter === 'draft'
              ? 'border-b-2 border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
              : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
          }`}
        >
          임시저장
        </button>
      </div>
      
      {loading ? (
        <div className="py-10 text-center text-gray-500 dark:text-gray-400">로딩 중...</div>
      ) : posts.length === 0 ? (
        <div className="py-10 text-center text-gray-500 dark:text-gray-400">
          게시물이 없습니다.
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 sm:rounded-md shadow-sm">
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
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </div>
                    </div>
                    <div className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                      {post.slug}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
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
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => router.push(`/admin/posts/${post.id}`)}
                        className="text-sky-600 hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-300"
                      >
                        편집
                      </button>
                      
                      {post.status === 'draft' && (
                        <button
                          onClick={() => handleStatusChange(String(post.id), 'published')}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          발행
                        </button>
                      )}
                      
                      {post.status === 'published' && (
                        <button
                          onClick={() => handleStatusChange(String(post.id), 'draft')}
                          className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                        >
                          비공개
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(String(post.id))}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        삭제
                      </button>
                      
                      {post.status === 'published' && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          보기
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 