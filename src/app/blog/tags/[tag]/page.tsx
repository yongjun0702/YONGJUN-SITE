import { redirect } from 'next/navigation'

interface TagPageProps {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params
  
  redirect(`/blog?tag=${encodeURIComponent(tag)}`)
  
  return null
} 