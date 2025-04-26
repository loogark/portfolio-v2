import { useSelectedLanguage } from "../context";
import {
  Dictionaries,
  LangKeys,
  dictionaries,
  getTranslation,
} from "../internationalization";

export const useTranslation = () => {
  const { selectedLang = "en" } = useSelectedLanguage();
  const dict = dictionaries[selectedLang];

  return [
    (fallback: string, key: keyof Dictionaries[LangKeys]) =>
      getTranslation(fallback, key, dict),
  ] as const;
};
