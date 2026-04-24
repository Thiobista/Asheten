"use client";

import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider } from "next-themes";

type Language = "en" | "am";

export function Providers({ children, initialLanguage = "en" }: { children: React.ReactNode; initialLanguage?: Language }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
