import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { toText } from 'hast-util-to-text'

export interface TocEntry {
  level: number;
  id: string;
  text: string;
}

function rehypeExtractHeadings({ headings }: { headings: TocEntry[] }) {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        const id = node.properties?.id;
        const textContent = toText(node);
        if (id && textContent.trim()) {
          headings.push({
            level: parseInt(node.tagName.substring(1)),
            id: String(id),
            text: textContent.trim(),
          });
        }
      }
    });
  };
}

export async function extractHeadingsFromMarkdown(content: string): Promise<TocEntry[]> {
  if (!content) return [];
  
  const headings: TocEntry[] = [];
  
  try {
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeExtractHeadings, { headings })
      .use(rehypeStringify)
      .process(content);
      
    return headings;
  } catch (e) {
    console.error("Error extracting headings from markdown:", e);
    return [];
  }
} 