"use client"

import { useEffect, useState } from "react"
import { achievementApi, Achievement } from "@/lib/api"
import Link from "next/link"
import NextImage from "next/image"
import { supabase } from "@/lib/supabase"

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await achievementApi.getAll()
      setAchievements(response.data)
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  const extractStoragePath = (publicUrl: string): { bucket: string; path: string } | null => {
    try {
      const url = new URL(publicUrl)
      const parts = url.pathname.split("/")
      const idx = parts.findIndex((p) => p === "public")
      const bucket = parts[idx + 1]
      const path = parts.slice(idx + 2).join("/")
      if (!bucket || !path) return null
      return { bucket, path }
    } catch {
      return null
    }
  }

  const handleDelete = async (ach: Achievement) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return

    try {
      if (ach.image_url) {
        const info = extractStoragePath(ach.image_url)
        if (info) {
          const { error: storageErr } = await supabase.storage
            .from(info.bucket)
            .remove([info.path])
          if (storageErr) {
            console.warn("Failed to remove file from storage:", storageErr.message || storageErr)
          }
        }
      }

      await achievementApi.delete(ach.id)
      await fetchAchievements()
    } catch (error) {
      console.error("Error deleting achievement:", (error as any)?.message || error)
      alert(`Failed to delete achievement: ${(error as any)?.message || "Unknown error"}`)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#d4af37]">Manage Achievements</h1>
        <Link
          href="/admin/achievements/new"
          className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-4 rounded transition"
        >
          Add New Achievement
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="bg-[#124448] rounded-lg overflow-hidden">
            {achievement.image_url && (
              <div className="relative h-48 w-full">
                <NextImage
                  src={achievement.image_url}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              {achievement.description && (
                <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
              )}
              {achievement.achievement_date && (
                <p className="text-sm text-gray-400 mb-2">
                  Date: {new Date(achievement.achievement_date).toLocaleDateString()}
                </p>
              )}
              {achievement.category && (
                <span className="inline-block bg-[#1a5a5f] text-xs px-2 py-1 rounded mb-2">
                  {achievement.category}
                </span>
              )}
              <div className="flex space-x-2 mt-4">
                <Link
                  href={`/admin/achievements/${achievement.id}/edit`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded text-sm transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(achievement)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-12 bg-[#124448] rounded-lg">
          <p className="text-gray-400 mb-4">No achievements yet</p>
          <Link
            href="/admin/achievements/new"
            className="inline-block bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-4 rounded transition"
          >
            Add Your First Achievement
          </Link>
        </div>
      )}
    </div>
  )
}

