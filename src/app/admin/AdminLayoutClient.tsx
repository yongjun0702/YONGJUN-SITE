'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            if (pathname === '/admin/login') {
                setLoading(false);
                return;
            }

            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)

            if (!user && pathname !== '/admin/login') {
                router.push('/admin/login')
            }
        }

        checkUser()
    }, [pathname, router, supabase.auth])

    if (pathname === '/admin/login') {
        return children
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl">로딩 중...</div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="mx-auto max-w-7xl flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-8">
                        <Link href="/admin" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400">
                            YONGJUN
                        </Link>
                        <nav className="flex items-center space-x-4">
                            <Link
                                href="/admin"
                                className={`text-sm font-medium ${pathname === '/admin'
                                        ? 'text-sky-600 dark:text-sky-400'
                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                    }`}
                            >
                                대시보드
                            </Link>
                            <Link
                                href="/admin/posts"
                                className={`text-sm font-medium ${pathname?.startsWith('/admin/posts')
                                        ? 'text-sky-600 dark:text-sky-400'
                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                    }`}
                            >
                                포스트
                            </Link>
                            <Link
                                href="/admin/profile"
                                className={`text-sm font-medium ${pathname === '/admin/profile'
                                        ? 'text-sky-600 dark:text-sky-400'
                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                    }`}
                            >
                                프로필
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
                        <button
                            onClick={handleSignOut}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
}
