'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import slugify from 'slugify'
import type { Post } from '@/types/blog'
import MarkdownEditor from '@/components/markdown/MarkdownEditor'

export default function EditPostPage() {
  const params = useParams();
  const postId = params?.id as string;
  
  const [post, setPost] = useState<Post | null>(null)
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    metaDescription: '',
    ogImageUrl: '',
    tags: '',
    slug: '',
    status: 'draft' as 'draft' | 'published' | 'archived'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const updateField = useCallback((field: keyof typeof formState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single()
        
        if (error) {
          throw error
        }
        
        if (data) {
          console.log('Fetched post data:', data);
          setPost(data)
          setFormState({
            title: data.title || '',
            content: data.content || '',
            metaDescription: data.meta_description || '',
            ogImageUrl: data.og_image_url || '',
            tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
            slug: data.slug || '',
            status: data.status || 'draft'
          })
        }
      } catch (error) {
        console.error('게시물을 가져오는 중 오류 발생:', error)
        setError('게시물을 가져오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [postId, supabase])

  useEffect(() => {
    if (formState.title && !formState.slug) {
      const timeoutId = setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          slug: slugify(formState.title, {
            lower: true,
            strict: true,
            locale: 'ko'
          })
        }));
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [formState.title, formState.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formState.title.trim()) {
      setError('제목을 입력해주세요')
      return
    }
    
    if (!formState.slug.trim()) {
      setError('URL 슬러그를 입력해주세요')
      return
    }
    
    setSaving(true)
    setError(null)
    
    const postData = {
      title: formState.title,
      slug: formState.slug,
      content: formState.content,
      meta_description: formState.metaDescription || null,
      og_image_url: formState.ogImageUrl || null,
      tags: formState.tags ? formState.tags.split(',').map(tag => tag.trim()) : null,
      status: formState.status,
      updated_at: new Date().toISOString(),
      published_at: formState.status === 'published' ? 
        (post?.published_at || new Date().toISOString()) : null
    }
    
    try {
      if (post?.slug !== formState.slug) {
        const { data: existingPost } = await supabase
          .from('posts')
          .select('id')
          .eq('slug', formState.slug)
          .neq('id', postId)
          .single()
        
        if (existingPost) {
          setError('이미 사용 중인 URL 슬러그입니다. 다른 슬러그를 입력해주세요.')
          setSaving(false)
          return
        }
      }
      
      const { error: updateError } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postId)
      
      if (updateError) {
        throw new Error(updateError.message)
      }
      
      router.push('/admin/posts')
      router.refresh()
    } catch (err: any) {
      console.error('Error updating post:', err)
      setError(err.message || '게시물을 저장하는 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }
  
  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `blog-images/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('blog-assets')
        .upload(filePath, file)
      
      if (uploadError) {
        throw new Error(uploadError.message)
      }
      
      const { data } = supabase.storage
        .from('blog-assets')
        .getPublicUrl(filePath)
      
      if (data?.publicUrl) {
        return data.publicUrl
      } else {
        throw new Error('이미지 URL을 가져올 수 없습니다')
      }
    } catch (err: any) {
      console.error('이미지 업로드 오류:', err)
      throw new Error(err.message || '이미지 업로드 실패')
    }
  }, [supabase.storage])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
          게시물을 불러오는 중...
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium text-red-600 dark:text-red-400">
          게시물을 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">포스트 편집</h1>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900">
          <div className="flex">
            <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                제목
              </label>
              <input
                type="text"
                id="title"
                value={formState.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="게시물 제목"
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                URL 슬러그
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  /blog/
                </span>
                <input
                  type="text"
                  id="slug"
                  value={formState.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="url-slug"
                />
              </div>
            </div>
          </div>
          
          <div>
            <MarkdownEditor 
              content={formState.content}
              onChange={(value) => updateField('content', value)}
              onImageUpload={handleImageUpload}
              placeholder="마크다운으로 내용을 작성하세요..."
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 pt-5 sm:grid-cols-2">
            <div>
              <label htmlFor="meta-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                메타 설명 (SEO)
              </label>
              <textarea
                id="meta-description"
                value={formState.metaDescription}
                onChange={(e) => updateField('metaDescription', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="검색 엔진과 소셜 미디어에 표시될 설명"
              />
            </div>
            
            <div>
              <label htmlFor="og-image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                대표 이미지 URL
              </label>
              <input
                type="text"
                id="og-image"
                value={formState.ogImageUrl}
                onChange={(e) => updateField('ogImageUrl', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                태그 (콤마로 구분)
              </label>
              <input
                type="text"
                id="tags"
                value={formState.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="태그1, 태그2, 태그3"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                상태
              </label>
              <select
                id="status"
                value={formState.status}
                onChange={(e) => updateField('status', e.target.value as 'draft' | 'published' | 'archived')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="draft">임시저장</option>
                <option value="published">발행</option>
                <option value="archived">삭제</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-5">
            <button
              type="button"
              onClick={() => router.push('/admin/posts')}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 dark:bg-primary dark:hover:bg-primary/90 transition-colors"
            >
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
} 