"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const AchievementPage = () => {
  const { t } = useLanguage();

  const achievements = [
    {
      id: 1,
      title: t("5+ Years of Excellence"),
      description: t("Over 5 years of successful operations serving clients across Ethiopia"),
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: t("1000+ Satisfied Clients"),
      description: t("Trusted by over 1000 clients across various business sectors"),
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: t("Multi-Sector Expertise"),
      description: t("Successfully operating across 5+ business sectors with proven track record"),
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 4,
      title: t("Award-Winning Service"),
      description: t("Recognized for excellence in business services and customer satisfaction"),
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        pageName={t("Achievement")}
        description={t("Our milestones and accomplishments that reflect our commitment to excellence and growth.")}
      />

      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-4xl mb-12 md:mb-16">
            <div className="text-center mb-8">
              <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-5xl">
                {t("Our Achievements")}
              </h1>
              <p className="text-body-color text-lg leading-relaxed md:text-xl">
                {t("We take pride in our accomplishments and milestones that demonstrate our growth, excellence, and commitment to serving our clients.")}
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-[#124448] rounded-lg border border-[#124448] p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="bg-white/10 text-white mb-6 inline-flex h-16 w-16 items-center justify-center rounded-md">
                  {achievement.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{achievement.title}</h3>
                <p className="text-white/80 text-base leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AchievementPage;

