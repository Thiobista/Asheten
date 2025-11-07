"use client";

import { LanguageProvider } from "../contexts/LanguageContext";

type Language = "en" | "am";

export function Providers({ children, initialLanguage = "en" }: { children: React.ReactNode; initialLanguage?: Language }) {
  return <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>;
}
