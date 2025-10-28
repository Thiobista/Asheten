import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ASHETEN INVESTMENT ONE MEMBER PLC - Leading Business Solutions in Ethiopia",
  description: "ASHETEN INVESTMENT ONE MEMBER PLC offers comprehensive business services including Tour & Travel, Import/Export, Wholesale/Retail Trade, Repair Services, and Hotel & Restaurant services in Addis Ababa, Ethiopia.",
  alternates: { canonical: "https://asheteninvestment.com/" },
  openGraph: {
    title: "ASHETEN INVESTMENT ONE MEMBER PLC",
    description: "Comprehensive business services in Ethiopia.",
    url: "https://asheteninvestment.com/",
    siteName: "ASHETEN INVESTMENT",
    images: [
      { url: "/images/logo/logo-2.png", width: 600, height: 315, alt: "ASHETEN INVESTMENT" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASHETEN INVESTMENT ONE MEMBER PLC",
    description: "Comprehensive business services in Ethiopia.",
    images: ["/images/logo/logo-2.png"],
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Contact />
    </>
  );
}
