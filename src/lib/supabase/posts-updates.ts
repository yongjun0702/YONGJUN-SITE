import { createClient } from '@/lib/supabase/server'; 
import { getPageViews } from '@/lib/analytics/ga'; 


export async function updatePostViews(slug: string): Promise<boolean> {
    const pagePath = `/blog/${slug}`; 
    const views = await getPageViews(pagePath);
    
    if (views > 0) {
        const supabase = await createClient(false); 
        
        const { error } = await supabase
            .from('posts')
            .update({ view_count: views }) 
            .eq('slug', slug);

        if (error) {
            console.error(`Error updating views for ${slug}:`, error.message);
            return false;
        }
        return true;
    }
    return false;
}
