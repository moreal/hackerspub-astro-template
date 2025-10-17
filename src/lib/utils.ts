interface Language {
  language: string;
  originalLanguage?: string | null;
}

export function getLanguageUrl(
  lang: Language,
  year: number,
  slug: string,
): string {
  return lang.originalLanguage
    ? `/posts/${year}/${slug}/${lang.language}/`
    : `/posts/${year}/${slug}/`;
}

export function generateAlternateLanguageLinks(
  availableLanguages: Language[],
  year: number,
  slug: string,
): Array<{ hreflang: string; href: string }> {
  return availableLanguages.map((lang) => ({
    hreflang: lang.language,
    href: getLanguageUrl(lang, year, slug),
  }));
}
