"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { certificateApi, Certificate } from "@/lib/api";

const CertificatesPage = () => {
  const { t } = useLanguage();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await certificateApi.getAll();
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getYearFromDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).getFullYear().toString();
    } catch {
      return "";
    }
  };

  return (
    <>
      <Breadcrumb
        pageName={t("Certificates")}
        description={t("Our official certifications and licenses that demonstrate our commitment to quality and compliance.")}
      />

      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-4xl mb-12 md:mb-16">
            <div className="text-center mb-8">
              <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-5xl">
                {t("Our Certificates")}
              </h1>
              <p className="text-body-color text-lg leading-relaxed md:text-xl">
                {t("We are proud to hold various certifications and licenses that demonstrate our commitment to excellence, compliance, and quality service delivery.")}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading certificates...</p>
              </div>
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">{t("No certificates available at the moment.")}</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative h-64 w-full mb-4 overflow-hidden rounded-md">
                    <Image
                      src={certificate.certificate_url}
                      alt={certificate.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                      unoptimized
                    />
                  </div>
                  <div className="text-white">
                    {certificate.issued_date && (
                      <div className="mb-2 text-sm text-white/70">
                        {getYearFromDate(certificate.issued_date)}
                        {certificate.issued_by && ` • ${certificate.issued_by}`}
                      </div>
                    )}
                    <h3 className="mb-3 text-xl font-semibold">{certificate.title}</h3>
                    {certificate.description && (
                      <p className="text-white/80 text-base leading-relaxed">{certificate.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CertificatesPage;

