import { FC } from 'react'

interface SkeletonProps {
  className?: string
}

const Skeleton: FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
)

interface BlogPostSkeletonProps {
  className?: string
}

export const BlogPostSkeleton: FC<BlogPostSkeletonProps> = ({ className = '' }) => {
  return (
    <article className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 ${className}`}>
      <div className="p-6 sm:p-8">
        <Skeleton className="h-8 sm:h-10 w-3/4 mb-4" />
        
        <div className="space-y-2 mt-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24 ml-3" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </article>
  )
}

interface BlogPostSkeletonListProps {
  count?: number
  className?: string
}

export const BlogPostSkeletonList: FC<BlogPostSkeletonListProps> = ({ 
  count = 3,
  className = ''
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <BlogPostSkeleton key={index} />
      ))}
    </div>
  )
} 