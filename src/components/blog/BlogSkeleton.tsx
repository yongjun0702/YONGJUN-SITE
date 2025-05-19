import { FC } from 'react'

interface BlogPostSkeletonProps {
  className?: string
}

export const BlogPostSkeleton: FC<BlogPostSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse ${className}`}>
      <div className="p-6 sm:p-8">
        <div className="h-8 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-4"></div>
        <div className="space-y-2 mt-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded ml-3 w-24"></div>
        </div>
      </div>
    </div>
  )
}

interface BlogPostSkeletonListProps {
  count?: number
}

export const BlogPostSkeletonList: FC<BlogPostSkeletonListProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-8">
      {[...Array(count)].map((_, index) => (
        <BlogPostSkeleton key={index} />
      ))}
    </div>
  )
} 