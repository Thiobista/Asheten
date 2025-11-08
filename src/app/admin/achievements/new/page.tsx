"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { achievementApi } from "@/lib/api"
import { supabase } from "@/lib/supabase"

export default function NewAchievementPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    achievement_date: "",
    category: "",
    display_order: 0,
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `achievements/${fileName}`

      const { error: uploadError, data } = await supabase.storage
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
    setLoading(true)

    try {
      await achievementApi.create({
        title: formData.title,
        description: formData.description || undefined,
        image_url: formData.image_url || undefined,
        achievement_date: formData.achievement_date || undefined,
        category: formData.category || undefined,
        display_order: formData.display_order,
      })
      router.push("/admin/achievements")
    } catch (error) {
      console.error("Error creating achievement:", error)
      alert("Failed to create achievement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#d4af37]">Add New Achievement</h1>
      
      <form onSubmit={handleSubmit} className="bg-[#124448] rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
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
              <img src={formData.image_url} alt="Preview" className="max-w-xs rounded" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Achievement Date</label>
            <input
              type="date"
              value={formData.achievement_date}
              onChange={(e) => setFormData({ ...formData, achievement_date: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Display Order</label>
          <input
            type="number"
            value={formData.display_order}
            onChange={(e) => {
              const v = e.target.value
              setFormData({ ...formData, display_order: v === '' ? 0 : Number(v) || 0 })
            }}
            min={0}
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Achievement"}
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





