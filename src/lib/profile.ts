import { createClient } from '@/lib/supabase/client';

export interface Profile {
  name: string;
  description: string;
  avatar_url?: string;
}

export async function getAuthorProfile(): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching author profile:', error);
    return null;
  }

  return data;
}

export async function updateAuthorProfile(profile: Partial<Profile>): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .select()
    .single();

  if (error) {
    console.error('Error updating author profile:', error);
    return null;
  }

  return data;
}