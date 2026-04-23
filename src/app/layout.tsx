import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import DevServiceWorkerCleanup from "@/components/DevServiceWorkerCleanup";

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

      <body className={`bg-white text-slate-900 antialiased dark:bg-[#050816] dark:text-slate-100 ${inter.className}`}>
        <DevServiceWorkerCleanup />
        <Providers initialLanguage={initialLanguage}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

