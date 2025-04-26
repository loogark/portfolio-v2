import { en } from "./en";
import { fr } from "./fr";

export const dictionaries = {
  en,
  fr,
} as const;

export type LangKeys = keyof typeof dictionaries;

export type Dictionaries = typeof dictionaries;

export function getTranslation(
  fallback: string,
  key: keyof Dictionaries[LangKeys],
  dict: Dictionaries[LangKeys]
) {
  const translation = dict[key] as string;

  return translation ?? fallback;
}
