"use client";
import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import { useLanguage } from "../../contexts/LanguageContext";

const Brands = () => {
  const { t } = useLanguage();
  return (
    <section className="pt-16 bg-[#0f3b3e] text-white">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center rounded-xs bg-[#124448] px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              <div className="w-full text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{t("Our Partners")}</h3>
                <p className="text-[#cfd8dc]">{t("Partners_Paragraph")}</p>
              </div>
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="flex w-1/2 items-center justify-center px-3 py-[15px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        className="relative h-10 w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 flex items-center justify-center"
      >
        <Image
          src={imageLight}
          alt={name}
          fill
          className="hidden dark:block"
        />
        <Image
          src={image}
          alt={name}
          fill
          className="block dark:hidden"
        />
      </a>
    </div>
  );
};
