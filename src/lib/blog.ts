import { createClient } from '@/lib/supabase/client';
import { PostNavigationItem } from '@/components/blog/BlogPostNavigation';

export async function fetchAdjacentPosts(currentPostSlug: string, currentPostPublishedAt: string) {
  const supabase = createClient();
  
  try {
    const [prevPostResult, nextPostResult] = await Promise.all([
      supabase
        .from('posts')
        .select('title, slug, published_at')
        .eq('status', 'published')
        .lt('published_at', currentPostPublishedAt)
        .neq('slug', currentPostSlug)
        .order('published_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
        
      supabase
        .from('posts')
        .select('title, slug, published_at')
        .eq('status', 'published')
        .gt('published_at', currentPostPublishedAt)
        .neq('slug', currentPostSlug)
        .order('published_at', { ascending: true })
        .limit(1)
        .maybeSingle()
    ]);
    
    return {
      prevPost: prevPostResult.data as PostNavigationItem | null,
      nextPost: nextPostResult.data as PostNavigationItem | null,
      isLoading: false
    };
  } catch (error) {
    console.error('Error fetching navigation posts:', error);
    return {
      prevPost: null,
      nextPost: null,
      isLoading: false
    };
  }
} 