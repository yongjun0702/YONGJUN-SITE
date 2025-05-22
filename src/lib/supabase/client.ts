'use client'

import { createBrowserClient } from '@supabase/ssr'
import { supabaseConfig } from './config'

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export const createClient = () => {
  if (supabaseClient) return supabaseClient
  
  supabaseClient = createBrowserClient(
    supabaseConfig.url,
    supabaseConfig.anonKey
  )
  
  return supabaseClient
} 