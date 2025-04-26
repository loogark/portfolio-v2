"use client";

import { ReactNode, useState } from "react";
import { SelectedLanguagesContext } from "../context";

export type LangKeys = "en" | "fr";

interface LangProviderProps {
  children: ReactNode;
}

export const SelectedLanguagesProvider = ({ children }: LangProviderProps) => {
  const [selectedLang, setSelectedLang] = useState<LangKeys>("en");

  return (
    <SelectedLanguagesContext.Provider
      value={{ selectedLang, setSelectedLang }}
    >
      {children}
    </SelectedLanguagesContext.Provider>
  );
};
