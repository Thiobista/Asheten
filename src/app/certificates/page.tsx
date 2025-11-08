"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const CertificatesPage = () => {
  const { t } = useLanguage();

  const certificates = [
    {
      id: 1,
      title: t("Business License Certificate"),
      description: t("Official business license from Ethiopian authorities"),
      image: "/images/certificates/certificate-01.jpg",
      year: "2020",
    },
    {
      id: 2,
      title: t("Tour Operator License"),
      description: t("Licensed tour operator certification"),
      image: "/images/certificates/certificate-02.jpg",
      year: "2021",
    },
    {
      id: 3,
      title: t("Import Export License"),
      description: t("International trade license certification"),
      image: "/images/certificates/certificate-03.jpg",
      year: "2022",
    },
    {
      id: 4,
      title: t("Quality Assurance Certificate"),
      description: t("Quality management system certification"),
      image: "/images/certificates/certificate-04.jpg",
      year: "2023",
    },
  ];

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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="relative h-64 w-full mb-4 overflow-hidden rounded-md">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="text-white">
                  <div className="mb-2 text-sm text-white/70">{certificate.year}</div>
                  <h3 className="mb-3 text-xl font-semibold">{certificate.title}</h3>
                  <p className="text-white/80 text-base leading-relaxed">{certificate.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CertificatesPage;

