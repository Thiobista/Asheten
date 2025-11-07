"use client";
import { Feature } from "@/types/feature";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph, slug } = feature;
  const { t } = useLanguage();
  return (
    <div className="w-full">
      <Link href={`/services/${slug}`} className="block group">
        <div className="wow fadeInUp" data-wow-delay=".15s">
          <div className="bg-primary/10 text-primary mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md group-hover:bg-primary/20">
            {icon}
          </div>
          <h3 className="mb-5 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl dark:text-white group-hover:text-primary">
            {t(title)}
          </h3>
          <p className="text-body-color pr-[10px] text-base leading-relaxed font-medium">
            {t(paragraph)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SingleFeature;
