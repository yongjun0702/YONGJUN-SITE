'use client'

import React from 'react'
import { SharedMarkdownRenderer } from './SharedMarkdownRenderer'

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <SharedMarkdownRenderer content={content} isPreview={false} />
} 