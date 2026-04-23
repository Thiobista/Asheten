"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { achievementApi, Achievement } from "@/lib/api";

const AchievementPage = () => {
  const { t } = useLanguage();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await achievementApi.getAll();
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultIcon = (
    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading achievements...</p>
              </div>
            </div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">{t("No achievements available at the moment.")}</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-dark rounded-lg border border-dark p-8 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {achievement.image_url ? (
                    <div className="relative h-48 w-full mb-6 overflow-hidden rounded-md">
                      <Image
                        src={achievement.image_url}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="bg-white/10 text-white mb-6 inline-flex h-16 w-16 items-center justify-center rounded-md">
                      {defaultIcon}
                    </div>
                  )}
                  <h3 className="mb-3 text-xl font-semibold text-white">{achievement.title}</h3>
                  {achievement.description && (
                    <p className="text-white/80 text-base leading-relaxed">{achievement.description}</p>
                  )}
                  {achievement.achievement_date && (
                    <p className="mt-3 text-sm text-white/60">
                      {new Date(achievement.achievement_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AchievementPage;

