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
  
  const blockquoteClass = "my-6 border-l-4 border-primary dark:border-primary pl-4 pr-2 py-3 bg-neutral-50 dark:bg-neutral-900 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-tight";
  
  const preClass = isPreview
    ? "my-6 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-x-auto"
    : "my-7 p-5 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-x-auto";
  
  const inlineCodeClass = isPreview
    ? "px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm"
    : "px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm md:text-base";
  
  const blockCodeClass = isPreview
    ? "text-sm"
    : "text-sm md:text-base";
  
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
              <img src={src} alt={alt || ""} className={imgClass} />
            ) : (
              <MarkdownImage src={src.toString()} alt={alt || ""} />
            );
          },
        }}
      >
        {preprocessMarkdown(content)}
      </ReactMarkdown>
    </div>
  )
} 