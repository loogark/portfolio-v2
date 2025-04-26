"use client";

import React, { useContext } from "react";

export type LangKeys = "en" | "fr";

export type SetLang = (lang: LangKeys) => void;

export interface LangContextI {
  selectedLang: LangKeys;
  setSelectedLang: SetLang;
}

export const SelectedLanguagesContext =
  React.createContext<LangContextI | null>(null);

export const useSelectedLanguage = () => {
  const context = useContext(SelectedLanguagesContext);
  if (context === null)
    throw new Error("Received null while reading useContext(LangContext).");
  return context;
};
