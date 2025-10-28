"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import JsonLd from "@/components/SEO/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#0f3b3e] text-white ${inter.className}`}>
        <Providers>
          <JsonLd
            data={[
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "ASHETEN INVESTMENT ONE MEMBER PLC",
                url: "https://asheteninvestment.com/",
                logo: "https://asheteninvestment.com/images/logo/logo-2.png",
                sameAs: [
                  "https://www.facebook.com/",
                  "https://www.linkedin.com/"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "ASHETEN INVESTMENT",
                url: "https://asheteninvestment.com/",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://asheteninvestment.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ]}
          />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

