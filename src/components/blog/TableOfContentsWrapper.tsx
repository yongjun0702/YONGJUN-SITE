'use client';

import TableOfContents from '@/components/blog/TableOfContents';

interface TocEntry {
  level: number;
  id: string;
  text: string;
}

export default function TableOfContentsWrapper({ headings }: { headings: TocEntry[] }) {
  return <TableOfContents headings={headings} />;
} 