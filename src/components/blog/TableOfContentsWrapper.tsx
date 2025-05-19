'use client';

import TableOfContents from '@/components/blog/TableOfContents';
import { extractHeadingsFromMarkdown, type TocEntry } from '@/lib/markdown';
import { useEffect, useState } from 'react';

interface TableOfContentsWrapperProps {
  postContent: string;
}

export default function TableOfContentsWrapper({ postContent }: TableOfContentsWrapperProps) {
  const [headings, setHeadings] = useState<TocEntry[]>([]);

  useEffect(() => {
    if (postContent) {
      extractHeadingsFromMarkdown(postContent).then(extractedHeadings => {
        setHeadings(extractedHeadings);
      });
    } else {
      setHeadings([]);
    }
  }, [postContent]);

  return <TableOfContents headings={headings} />;
} 