'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import { MarkdownImage } from '@/components/blog/ClientImage'
import Image from 'next/image'

interface SharedMarkdownRendererProps {
  content: string;
  isPreview?: boolean;
}

export function preprocessMarkdown(markdown: string): string {
  if (!markdown) return '';
  
  const boldRegex = /\*\*([^*]+)\*\*/g;
  return markdown.replace(boldRegex, '<strong>$1</strong>');
}

export const SharedMarkdownRenderer: React.FC<SharedMarkdownRendererProps> = ({ 
  content,
  isPreview = false
}) => {
  const containerClass = isPreview 
    ? "prose prose-lg dark:prose-invert max-w-none" 
    : "prose prose-lg md:prose-xl dark:prose-invert mx-auto";
  
  const h2Class = isPreview
    ? "mt-12 mb-4 scroll-mt-24 text-2xl font-bold"
    : "text-2xl md:text-3xl font-bold mt-14 mb-5 scroll-mt-24";
  
  const h3Class = isPreview
    ? "mt-10 mb-3 scroll-mt-24 text-xl font-bold"
    : "text-xl md:text-2xl font-bold mt-12 mb-4 scroll-mt-24";
  
  const h4Class = isPreview
    ? "mt-8 mb-2 scroll-mt-24 text-lg font-bold"
    : "text-lg md:text-xl font-semibold mt-10 mb-3 scroll-mt-24";
  
  const paragraphClass = isPreview
    ? "my-4"
    : "text-base md:text-lg my-5 leading-relaxed";
  
  const blockquoteClass = "my-6 border-l-4 border-primary dark:border-primary pl-4 pr-2 py-3 bg-neutral-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-tight";
  
  const preClass = isPreview
    ? "my-6 p-4 bg-stone-50 dark:bg-neutral-800 overflow-x-auto"
    : "my-7 p-5 bg-stone-50 dark:bg-neutral-800 overflow-x-auto";
  
  const inlineCodeClass = isPreview
    ? "px-1.5 py-0.5 bg-stone-50 dark:bg-neutral-800 text-sm text-gray-800 dark:text-gray-200"
    : "px-1.5 py-0.5 bg-stone-50 dark:bg-neutral-800 text-sm md:text-base text-gray-800 dark:text-gray-200";
  
  const blockCodeClass = isPreview
    ? "text-sm text-gray-800 dark:text-gray-200"
    : "text-sm md:text-base text-gray-800 dark:text-gray-200";
  
  const ulClass = isPreview
    ? "my-4 list-disc pl-6 space-y-2"
    : "my-5 list-disc pl-6 space-y-2 text-base md:text-lg";
  
  const olClass = isPreview
    ? "my-4 list-decimal pl-6 space-y-2"
    : "my-5 list-decimal pl-6 space-y-2 text-base md:text-lg";
  
  const liClass = isPreview
    ? "pl-2"
    : "pl-2 leading-tight";
  
  const imgClass = isPreview
    ? "my-8 mx-auto max-w-full h-auto"
    : "my-8";
  
  const linkClass = "text-primary dark:text-primary font-medium hover:text-primary/80 dark:hover:text-primary/80 transition-colors";

  const tableWrapperClass = "my-6 overflow-x-auto";
  const tableClass = "w-full min-w-full border-collapse";
  const tableContentWrapperClass = "bg-stone-50 dark:bg-neutral-800 p-1 sm:p-2 md:p-4";
  const thClass = "px-3 md:px-4 py-2 md:py-3 text-left border-b-2 border-primary/40 dark:border-primary/40 font-semibold text-gray-800 dark:text-gray-100";
  const tdClass = "px-3 md:px-4 py-2 md:py-3 text-left border-b border-neutral-200 dark:border-neutral-700/60 text-gray-600 dark:text-gray-300";

  return (
    <div className={containerClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        components={{
          h2: ({node, ...props}) => <h2 className={h2Class} {...props} />,
          h3: ({node, ...props}) => <h3 className={h3Class} {...props} />,
          h4: ({node, ...props}) => <h4 className={h4Class} {...props} />,
          p: ({node, ...props}) => {
            const hasImage = node?.children?.some((child: any) => 
              child.type === 'element' && child.tagName === 'img'
            );
            
            if (hasImage) {
              return <>{props.children}</>;
            }
            return <p className={paragraphClass} {...props} />;
          },
          blockquote: ({node, ...props}) => <blockquote className={blockquoteClass} {...props} />,
          pre: ({node, ...props}) => (
            <pre className={preClass} {...props} />
          ),
          code: ({node, ...props}) => {
            const className = props.className || '';
            const isInline = !className.includes('language-');
            return isInline ? (
              <code className={inlineCodeClass} {...props} />
            ) : (
              <code className={blockCodeClass} {...props} />
            );
          },
          ul: ({node, ...props}) => (
            <ul className={ulClass} {...props} />
          ),
          ol: ({node, ...props}) => (
            <ol className={olClass} {...props} />
          ),
          li: ({node, ...props}) => (
            <li className={liClass} {...props} />
          ),
          a: ({node, ...props}) => (
            <a className={linkClass} {...props} />
          ),
          img: ({node, ...props}) => {
            const { src, alt } = props;
            if (!src) return null;
            
            return isPreview ? (
              <Image 
                src={src.toString()} 
                alt={alt || ""} 
                width={500}
                height={300}
                loading="lazy"
                className={imgClass}
                unoptimized={true}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <MarkdownImage src={src.toString()} alt={alt || ""} />
            );
          },
          table: ({ node, ...props }) => (
            <div className={tableWrapperClass}>
              <div className={tableContentWrapperClass}>
                <table className={tableClass} {...props} />
              </div>
            </div>
          ),
          th: ({ node, ...props }) => <th className={thClass} {...props} />,
          td: ({ node, ...props }) => {
            const { children } = props;
            const hasStrong = React.Children.toArray(children).some(
              (child: any) => child.type === 'strong' || (child.props?.node?.tagName === 'strong')
            );
            
            return (
              <td 
                className={`${tdClass} ${hasStrong ? 'font-semibold text-gray-700 dark:text-gray-200' : ''}`}
                {...props} 
              />
            );
          },
        }}
      >
        {preprocessMarkdown(content)}
      </ReactMarkdown>
    </div>
  )
} 