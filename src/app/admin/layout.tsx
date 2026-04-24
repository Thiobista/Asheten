"use client"

import { useEffect, useState, useCallback } from "react"
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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const checkUser = useCallback(async () => {
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
  }, [router])

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
  }, [router, pathname, checkUser])

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f3b3e] to-[#0a2a2c]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const menuItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/admin/images",
      label: "Images",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: "/admin/certificates",
      label: "Certificates",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      href: "/admin/achievements",
      label: "Achievements",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ]

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f3b3e] to-[#0a2a2c] flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-gradient-to-b from-[#124448] to-[#0d3538]
          border-r border-[#1a5a5f]
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${sidebarOpen ? "w-64" : "w-20"}
          flex flex-col
          shadow-2xl
        `}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-[#1a5a5f]">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition">
                <svg className="w-6 h-6 text-[#0f3b3e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#d4af37]">Admin</h1>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            </Link>
          )}
          {!sidebarOpen && (
            <Link href="/admin" className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-lg flex items-center justify-center shadow-lg mx-auto">
              <svg className="w-6 h-6 text-[#0f3b3e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[#1a5a5f] transition text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl
                  transition-all duration-200 group
                  ${active
                    ? "bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-[#0f3b3e] shadow-lg"
                    : "text-gray-300 hover:bg-[#1a5a5f] hover:text-white"
                  }
                `}
              >
                <span className={`flex-shrink-0 ${active ? "text-[#0f3b3e]" : "text-gray-400 group-hover:text-[#d4af37]"}`}>
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span className={`font-medium ${active ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-[#1a5a5f]">
          <div className={`
            flex items-center space-x-3 p-3 rounded-xl
            bg-[#0d3538] border border-[#1a5a5f]
            ${sidebarOpen ? "" : "justify-center"}
          `}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#0f3b3e] font-bold text-sm">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className={`
              w-full mt-3 flex items-center space-x-3 px-4 py-3 rounded-xl
              bg-red-600 hover:bg-red-700 text-white
              transition-all duration-200 shadow-lg hover:shadow-xl
              ${sidebarOpen ? "" : "justify-center"}
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-[#124448] border-b border-[#1a5a5f] shadow-lg">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#1a5a5f] transition text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1 lg:ml-0">
              <h2 className="text-xl font-semibold text-white">
                {menuItems.find(item => isActive(item.href))?.label || "Admin Dashboard"}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

