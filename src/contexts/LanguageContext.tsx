"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";

type Language = "en" | "am";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage = "en" }: { children: React.ReactNode; initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", language);
      document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 365}`;
      if (document?.documentElement) document.documentElement.lang = language === "am" ? "am" : "en";
    }
  }, [language]);

  const t = useMemo(() => {
    const dict = translations[language] || {};
    return (text: string) => dict[text] || text;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
