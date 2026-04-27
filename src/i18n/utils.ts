// SPDX-License-Identifier: Apache-2.0
import { ui, languages, type Lang } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as Lang;
  return "en";
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)["en"]): string {
    return ui[lang][key] ?? ui["en"][key];
  };
}

export function getAlternatePath(pathname: string, targetLang: Lang): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] in languages) {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }
  return "/" + segments.join("/") + "/";
}

export function getOtherLanguages(currentLang: Lang) {
  return (Object.keys(languages) as Lang[]).filter((l) => l !== currentLang);
}
