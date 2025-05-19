'use client'

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export function ClientHeader() {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')
  
  if (isAdminPage) {
    return null
  }
  
  return <Header />
}

export function ClientFooter() {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')
  
  if (isAdminPage) {
    return null
  }
  
  return <Footer />
} 