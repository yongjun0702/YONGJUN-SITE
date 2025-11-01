import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server'; 
import { updatePostViews } from '@/lib/supabase/posts-updates'; 

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
  }

  try {
    const supabase = await createClient(false);

    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug')
      .eq('status', 'published');

    if (error || !posts) {
      throw new Error(error?.message || 'Failed to fetch posts for view update');
    }

    const updatePromises = posts.map(post => updatePostViews(post.slug));
    const results = await Promise.all(updatePromises);
    
    const successCount = results.filter(r => r).length;

    return NextResponse.json({ 
      success: true, 
      message: `${successCount} / ${posts.length} posts views updated successfully.`,
      totalPosts: posts.length,
    });

  } catch (e) {
    const error = e as Error;
    console.error('Global View Update Failed:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
