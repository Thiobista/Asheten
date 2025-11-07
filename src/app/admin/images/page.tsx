"use client"

import { useEffect, useState } from "react"
import { imageApi, Image as ImageType } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"

export default function ImagesPage() {
  const [images, setImages] = useState<ImageType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await imageApi.getAll()
      setImages(response.data)
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      await imageApi.delete(id)
      fetchImages()
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Failed to delete image")
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#d4af37]">Manage Images</h1>
        <Link
          href="/admin/images/new"
          className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-4 rounded transition"
        >
          Add New Image
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-[#124448] rounded-lg overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={image.image_url}
                alt={image.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
              {image.description && (
                <p className="text-sm text-gray-300 mb-2">{image.description}</p>
              )}
              {image.category && (
                <span className="inline-block bg-[#1a5a5f] text-xs px-2 py-1 rounded mb-2">
                  {image.category}
                </span>
              )}
              <div className="flex space-x-2 mt-4">
                <Link
                  href={`/admin/images/${image.id}/edit`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded text-sm transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 bg-[#124448] rounded-lg">
          <p className="text-gray-400 mb-4">No images yet</p>
          <Link
            href="/admin/images/new"
            className="inline-block bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-4 rounded transition"
          >
            Add Your First Image
          </Link>
        </div>
      )}
    </div>
  )
}

