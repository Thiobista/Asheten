"use client"

import { useEffect, useState } from "react"
import { imageApi, certificateApi, achievementApi } from "@/lib/api"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    images: 0,
    certificates: 0,
    achievements: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [imagesRes, certificatesRes, achievementsRes] = await Promise.all([
        imageApi.getAll(),
        certificateApi.getAll(),
        achievementApi.getAll(),
      ])

      setStats({
        images: imagesRes.data.length,
        certificates: certificatesRes.data.length,
        achievements: achievementsRes.data.length,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-[#d4af37]">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#124448] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Images</h2>
          <p className="text-3xl font-bold text-[#d4af37]">{stats.images}</p>
          <Link href="/admin/images" className="text-sm text-blue-400 hover:underline mt-2 block">
            Manage Images →
          </Link>
        </div>
        
        <div className="bg-[#124448] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Certificates</h2>
          <p className="text-3xl font-bold text-[#d4af37]">{stats.certificates}</p>
          <Link href="/admin/certificates" className="text-sm text-blue-400 hover:underline mt-2 block">
            Manage Certificates →
          </Link>
        </div>
        
        <div className="bg-[#124448] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <p className="text-3xl font-bold text-[#d4af37]">{stats.achievements}</p>
          <Link href="/admin/achievements" className="text-sm text-blue-400 hover:underline mt-2 block">
            Manage Achievements →
          </Link>
        </div>
      </div>

      <div className="bg-[#124448] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/images/new"
            className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-3 px-6 rounded text-center transition"
          >
            Add New Image
          </Link>
          <Link
            href="/admin/certificates/new"
            className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-3 px-6 rounded text-center transition"
          >
            Add New Certificate
          </Link>
          <Link
            href="/admin/achievements/new"
            className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-3 px-6 rounded text-center transition"
          >
            Add New Achievement
          </Link>
        </div>
      </div>
    </div>
  )
}





