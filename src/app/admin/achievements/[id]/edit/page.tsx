"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { achievementApi, Achievement } from "@/lib/api"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

export default function EditAchievementPage() {
  const router = useRouter()
  const params = useParams() as { id?: string }
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [originalUrl, setOriginalUrl] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState<Partial<Achievement>>({
    title: "",
    description: "",
    image_url: "",
    achievement_date: "",
    category: "",
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    const fetch = async () => {
      if (!params?.id) return
      try {
        const { data } = await achievementApi.getById(params.id)
        setFormData({
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          achievement_date: data.achievement_date,
          category: data.category,
          display_order: data.display_order,
          is_active: data.is_active,
        })
        setOriginalUrl(data.image_url)
      } catch (error: any) {
        console.error("Error loading achievement:", error?.message || error)
        alert(`Failed to load achievement: ${error?.message || "Unknown error"}`)
        router.back()
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [params?.id, router])

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `achievements/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image_url: publicUrl })
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!params?.id) return
    setSaving(true)
    try {
      // remove old file if url changed
      if (originalUrl && formData.image_url && originalUrl !== formData.image_url) {
        const info = extractStoragePath(originalUrl)
        if (info) {
          await supabase.storage.from(info.bucket).remove([info.path])
        }
      }

      await achievementApi.update(params.id, {
        title: formData.title || "",
        description: formData.description,
        image_url: formData.image_url,
        achievement_date: formData.achievement_date,
        category: formData.category,
        display_order: formData.display_order ?? 0,
        is_active: formData.is_active ?? true,
      })
      router.push("/admin/achievements")
    } catch (error: any) {
      console.error("Error updating achievement:", error?.message || error)
      alert(`Failed to update achievement: ${error?.message || "Unknown error"}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#d4af37]">Edit Achievement</h1>

      <form onSubmit={handleSubmit} className="bg-[#124448] rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white"
          />
          {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
          {formData.image_url && (
            <div className="mt-4">
              <Image src={formData.image_url} alt="Preview" className="max-w-xs rounded" width={320} height={240} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Achievement Date</label>
            <input
              type="date"
              value={formData.achievement_date || ""}
              onChange={(e) => setFormData({ ...formData, achievement_date: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category || ""}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Display Order</label>
          <input
            type="number"
            value={formData.display_order ?? 0}
            onChange={(e) => {
              const v = e.target.value
              const num = v === '' ? 0 : Number(v) || 0
              setFormData({ ...formData, display_order: num })
            }}
            min={0}
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="is_active"
            type="checkbox"
            checked={!!formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          />
          <label htmlFor="is_active">Active</label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
