"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { certificateApi, Certificate } from "@/lib/api"
import { supabase } from "@/lib/supabase"

export default function EditCertificatePage() {
  const router = useRouter()
  const params = useParams() as { id?: string }
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [originalUrl, setOriginalUrl] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: "",
    description: "",
    certificate_url: "",
    issued_by: "",
    issued_date: "",
    expiry_date: "",
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    const fetch = async () => {
      if (!params?.id) return
      try {
        const { data } = await certificateApi.getById(params.id)
        setFormData({
          title: data.title,
          description: data.description,
          certificate_url: data.certificate_url,
          issued_by: data.issued_by,
          issued_date: data.issued_date,
          expiry_date: data.expiry_date,
          display_order: data.display_order,
          is_active: data.is_active,
        })
        setOriginalUrl(data.certificate_url)
      } catch (error: any) {
        console.error("Error loading certificate:", error?.message || error)
        alert(`Failed to load certificate: ${error?.message || "Unknown error"}`)
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
      const filePath = `certificates/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath)

      setFormData((prev) => ({ ...prev, certificate_url: publicUrl }))
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload certificate")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!params?.id) return
    setSaving(true)
    try {
      await certificateApi.update(params.id, {
        title: formData.title || "",
        description: formData.description,
        certificate_url: formData.certificate_url || "",
        issued_by: formData.issued_by,
        issued_date: formData.issued_date,
        expiry_date: formData.expiry_date,
        display_order: formData.display_order ?? 0,
        is_active: formData.is_active ?? true,
      })

      // After a successful update, remove previous file if URL changed
      if (originalUrl && formData.certificate_url && originalUrl !== formData.certificate_url) {
        const info = extractStoragePath(originalUrl)
        if (info) {
          const { error: storageErr } = await supabase.storage
            .from(info.bucket)
            .remove([info.path])
          if (storageErr) {
            console.warn("Failed to remove previous certificate file:", storageErr.message || storageErr)
          }
        }
      }
      router.push("/admin/certificates")
    } catch (error: any) {
      console.error("Error updating certificate:", error?.message || error)
      alert(`Failed to update certificate: ${error?.message || "Unknown error"}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#d4af37]">Edit Certificate</h1>

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
          <label className="block text-sm font-medium mb-2">Replace File</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white"
          />
          {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Issued By</label>
            <input
              type="text"
              value={formData.issued_by || ""}
              onChange={(e) => setFormData({ ...formData, issued_by: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Issued Date</label>
            <input
              type="date"
              value={formData.issued_date || ""}
              onChange={(e) => setFormData({ ...formData, issued_date: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <input
              type="date"
              value={formData.expiry_date || ""}
              onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
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
