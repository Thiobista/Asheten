"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Do not run auth guard on the login page itself
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user)
      } else {
        setUser(null)
        router.push('/admin/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router, pathname])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // On login page, bypass the admin layout entirely
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f3b3e]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0f3b3e] text-white">
      <nav className="bg-[#124448] border-b border-[#1a5a5f]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-bold text-[#d4af37]">
                Admin Dashboard
              </Link>
              <div className="flex space-x-4">
                <Link href="/admin" className="hover:text-[#d4af37] transition">
                  Dashboard
                </Link>
                <Link href="/admin/images" className="hover:text-[#d4af37] transition">
                  Images
                </Link>
                <Link href="/admin/certificates" className="hover:text-[#d4af37] transition">
                  Certificates
                </Link>
                <Link href="/admin/achievements" className="hover:text-[#d4af37] transition">
                  Achievements
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

