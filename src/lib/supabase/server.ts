import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from './config';

export async function createClient(checkSession = false) {
  const cookieStore = await cookies();

  return createServerClient(
    supabaseConfig.url,
    supabaseConfig.anonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          if (checkSession) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
            }
          }
        },
        remove(name: string, options: CookieOptions) {
          if (checkSession) {
            try {
              cookieStore.set({ name, value: "", ...options });
            } catch (error) {
            }
          }
        },
      },
    }
  );
} 