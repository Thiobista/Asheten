import EnquPortfolioPage from "@/components/enqu/EnquPortfolioPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENQU | Elevating Software to Art",
  description: "ENQU designs and builds modern digital products for web and mobile.",
  alternates: { canonical: "https://enqu.dev/" },
  openGraph: {
    title: "ENQU",
    description: "Modern software delivery across web, mobile, and backend systems.",
    url: "https://enqu.dev/",
    siteName: "ENQU",
    images: [{ url: "/images/logo/logo.png", width: 512, height: 512, alt: "ENQU" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ENQU",
    description: "Elevating software to art.",
    images: ["/images/logo/logo.png"],
  },
};

export default function Home() {
  return <EnquPortfolioPage />;
}
