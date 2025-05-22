'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    avatar_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          throw new Error('사용자 정보를 찾을 수 없습니다.')
        }

        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: user.id,
                  name: user.email?.split('@')[0] || '',
                  description: '',
                  avatar_url: ''
                }
              ])
              .select()
              .single()

            if (insertError) {
              throw insertError
            }

            setProfile({
              name: user.email?.split('@')[0] || '',
              description: '',
              avatar_url: ''
            })
          } else {
            throw fetchError
          }
        } else if (data) {
          setProfile(data)
        }
      } catch (err: any) {
        console.error('Error fetching profile:', err)
        setError(err.message || '프로필을 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [supabase])

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `profile-images/${fileName}`
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profile.name.trim()) {
      setError('이름을 입력해주세요')
      return
    }
    
    setSaving(true)
    setError(null)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('사용자 정보를 찾을 수 없습니다.')
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          description: profile.description,
          avatar_url: profile.avatar_url
        })
        .eq('id', user.id)
      
      if (updateError) {
        throw new Error(updateError.message)
      }
      
      router.refresh()
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.message || '프로필을 저장하는 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
          프로필을 불러오는 중...
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        프로필 설정
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/50">
            <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            프로필 이미지
          </label>
          <div className="mt-2 flex items-center space-x-4">
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    try {
                      const url = await handleImageUpload(file)
                      setProfile(prev => ({ ...prev, avatar_url: url }))
                    } catch (err) {
                      setError('이미지 업로드에 실패했습니다')
                    }
                  }
                }}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-sky-50 file:text-sky-700
                  dark:file:bg-sky-900/50 dark:file:text-sky-300
                  hover:file:bg-sky-100 dark:hover:file:bg-sky-900/70"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                JPG, PNG, GIF up to 2MB
              </p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            소개
          </label>
          <textarea
            id="description"
            value={profile.description}
            onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  )
} 