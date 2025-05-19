'use client'

import React from 'react'
import Image from 'next/image'

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function FeaturedImage({ src, alt, className = '' }: ImageProps) {
  return (
    <div className={`relative aspect-[2/1] w-full mb-6 overflow-hidden ${className}`}>
      <Image 
        src={src} 
        alt={alt} 
        fill 
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
        className="object-cover"
      />
    </div>
  )
}

export function MarkdownImage({ src, alt, className = '' }: ImageProps) {
  const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');
  
  if (!isExternalUrl) {
    return (
      <span className="block my-8">
        <Image 
          src={src} 
          alt={alt} 
          width={800} 
          height={500}
          loading="lazy"
          className={`mx-auto max-w-full ${className}`}
          style={{ height: 'auto' }}
        />
      </span>
    );
  }
  
  return (
    <span className="block my-8">
      <Image 
        src={src} 
        alt={alt} 
        width={800}
        height={500}
        loading="lazy"
        className={`mx-auto max-w-full h-auto ${className}`}
        style={{ height: 'auto' }}
        unoptimized={true}
      />
    </span>
  );
} 