"use client";
import { useLanguage } from "../../contexts/LanguageContext";

const AboutSectionTwo = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {t("Ethiopian Market Expertise")}
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  {t("About2_Paragraph_1")}
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {t("Comprehensive Service Portfolio")}
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  {t("About2_Paragraph_2")}
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {t("Professional Excellence")}
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  {t("About2_Paragraph_3")}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto mb-12 aspect-25/24 max-w-[500px] text-center lg:m-0">
              <div className="bg-[#124448] rounded-lg p-8 h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">2+</div>
                  <div className="text-xl font-semibold text-white mb-2">{t("Years Experience")}</div>
                  <div className="text-white/80">{t("Serving Ethiopian businesses with excellence")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
