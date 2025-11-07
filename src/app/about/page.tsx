import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About Us | ASHETEN INVESTMENT ONE MEMBER PLC",
  description: "Learn about ASHETEN INVESTMENT ONE MEMBER PLC, a diversified business entity based in Addis Ababa, Ethiopia, providing comprehensive business solutions across multiple sectors.",
  alternates: { canonical: "https://asheteninvestment.com/about" },
  openGraph: {
    title: "About | ASHETEN INVESTMENT",
    description: "About ASHETEN INVESTMENT ONE MEMBER PLC",
    url: "https://asheteninvestment.com/about",
    images: [
      { url: "/images/logo/logo-2.png", width: 600, height: 315, alt: "ASHETEN" },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | ASHETEN INVESTMENT",
    description: "About ASHETEN INVESTMENT ONE MEMBER PLC",
    images: ["/images/logo/logo-2.png"],
  },
};

const AboutPage = () => {
  redirect("/#about");
};

export default AboutPage;
