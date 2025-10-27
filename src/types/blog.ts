export interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  meta_description?: string;
  og_image_url?: string;
  created_at: string;
  updated_at?: string;
  published_at?: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  view_count?: number;
} 
