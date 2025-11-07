"use client"

import { useEffect, useState } from "react"
import { certificateApi, Certificate } from "@/lib/api"
import Link from "next/link"

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await certificateApi.getAll()
      setCertificates(response.data)
    } catch (error) {
      console.error("Error fetching certificates:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return

    try {
      await certificateApi.delete(id)
      fetchCertificates()
    } catch (error) {
      console.error("Error deleting certificate:", error)
      alert("Failed to delete certificate")
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#d4af37]">Manage Certificates</h1>
        <Link
          href="/admin/certificates/new"
          className="bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-4 rounded transition"
        >
          Add New Certificate
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="bg-[#124448] rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{certificate.title}</h3>
            {certificate.description && (
              <p className="text-sm text-gray-300 mb-2">{certificate.description}</p>
            )}
            {certificate.issued_by && (
              <p className="text-sm text-gray-400 mb-2">Issued by: {certificate.issued_by}</p>
            )}
            {certificate.issued_date && (
              <p className="text-sm text-gray-400 mb-2">
                Issued: {new Date(certificate.issued_date).toLocaleDateString()}
              </p>
            )}
            <div className="flex space-x-2 mt-4">
              <a
                href={certificate.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded text-sm transition"
              >
                View
              </a>
              <Link
                href={`/admin/certificates/${certificate.id}/edit`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(certificate.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-12 bg-[#124448] rounded-lg">
          <p className="text-gray-400 mb-4">No certificates yet</p>
          <Link
            href="/admin/certificates/new"
            className="inline-block bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold py-2 px-4 rounded transition"
          >
            Add Your First Certificate
          </Link>
        </div>
      )}
    </div>
  )
}





