'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const mainRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [prevPath, setPrevPath] = useState(pathname)
  
  // 페이지 전환 감지 및 애니메이션 적용
  useEffect(() => {
    if (!mainRef.current) return
    
    // 같은 경로면 애니메이션 실행하지 않음
    if (pathname === prevPath) return
    
    // 이전 경로 업데이트
    setPrevPath(pathname)
    
    // 직접 CSS 트랜지션 적용
    const main = mainRef.current
    main.style.opacity = '0'
    
    // 다음 프레임에서 페이드인
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        main.style.transition = 'opacity 150ms ease-in'
        main.style.opacity = '1'
        
        // 트랜지션 완료 후 정리
        const handleTransitionEnd = () => {
          main.style.transition = ''
          main.removeEventListener('transitionend', handleTransitionEnd)
        }
        
        main.addEventListener('transitionend', handleTransitionEnd)
      })
    })
  }, [pathname, prevPath])
  
  return (
    <main 
      ref={mainRef}
      className="w-full flex-grow"
      style={{ 
        willChange: 'opacity',
        isolation: 'isolate'
      }}
    >
      {children}
    </main>
  )
} 