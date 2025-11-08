import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import JsonLd from "@/components/SEO/JsonLd";
import { Providers } from "./providers";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const initialLanguage = langCookie === "am" ? "am" : "en";
  return (
    <html suppressHydrationWarning lang={initialLanguage} translate="no">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <meta name="google" content="notranslate" />
      </head>

      <body className={`bg-[#0f3b3e] text-white ${inter.className}`}>
        <Providers initialLanguage={initialLanguage}>
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

