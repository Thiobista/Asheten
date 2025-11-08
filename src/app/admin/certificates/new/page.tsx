"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { certificateApi } from "@/lib/api"
import { supabase } from "@/lib/supabase"

export default function NewCertificatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    certificate_url: "",
    issued_by: "",
    issued_date: "",
    expiry_date: "",
    display_order: 0,
  })

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

      setFormData({ ...formData, certificate_url: publicUrl })
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload certificate")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await certificateApi.create({
        title: formData.title,
        description: formData.description || undefined,
        certificate_url: formData.certificate_url,
        issued_by: formData.issued_by || undefined,
        issued_date: formData.issued_date || undefined,
        expiry_date: formData.expiry_date || undefined,
        display_order: formData.display_order,
      })
      router.push("/admin/certificates")
    } catch (error) {
      console.error("Error creating certificate:", error)
      alert("Failed to create certificate")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#d4af37]">Add New Certificate</h1>
      
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
          <label className="block text-sm font-medium mb-2">Certificate File *</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white"
          />
          {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Issued By</label>
          <input
            type="text"
            value={formData.issued_by}
            onChange={(e) => setFormData({ ...formData, issued_by: e.target.value })}
            className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Issued Date</label>
            <input
              type="date"
              value={formData.issued_date}
              onChange={(e) => setFormData({ ...formData, issued_date: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a5a5f] border border-[#2a6a6f] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <input
              type="date"
              value={formData.expiry_date}
              onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
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
            disabled={loading || !formData.certificate_url}
            className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Certificate"}
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





