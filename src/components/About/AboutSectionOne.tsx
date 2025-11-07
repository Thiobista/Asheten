"use client";

import SectionTitle from "../Common/SectionTitle";
import { useLanguage } from "../../contexts/LanguageContext";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const { t } = useLanguage();

  const List = ({ text }) => (
    <p className="text-body-color mb-5 flex items-center text-lg font-medium">
      <span className="bg-primary/10 text-primary mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md">
        {checkIcon}
      </span>
      {t(text)}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <SectionTitle
                title={t("About ASHETEN INVESTMENT ONE MEMBER PLC")}
                mb="44px"
                center
              />
              
              <div className="mx-auto max-w-4xl">
                <div className="text-left">
                  <p className="mb-5 indent-6 text-base leading-relaxed text-body-color md:text-lg md:leading-loose">
                    {t("About_Intro_1_Prefix")} <span className="font-semibold">{t("Addis Ababa, Ethiopia")}</span>, {t("About_Intro_1_Suffix")}
                    {t("About_Intro_2")} <span className="font-semibold">{t("comprehensive, end-to-end solutions")}</span> {t("About_Intro_3")}
                  </p>
                  <p className="mb-5 indent-6 text-base leading-relaxed text-body-color md:text-lg md:leading-loose">
                    {t("Our approach blends")} <span className="text-primary font-semibold">{t("professionalism")}</span>,
                    <span className="text-primary font-semibold"> {t("reliability")}</span>, {t("and a")}
                    <span className="text-primary font-semibold"> {t("long-term partnership mindset")}</span> {t("to create meaningful impact for our clients.")}
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-[800px] text-center">
                <div className="mx-[-12px] flex flex-wrap justify-center">
                  <div className="w-full px-3 sm:w-1/2 lg:w-1/3">
                    <List text="Professional Services" />
                    <List text="Ethiopian Market Expertise" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-1/3">
                    <List text="Reliable Business Solutions" />
                    <List text="Multi-Sector Operations" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-1/3">
                    <List text="Customer-Focused Approach" />
                    <List text="Proven Track Record" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
