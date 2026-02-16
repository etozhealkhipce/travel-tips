import { useState, type FC } from "react";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { localeDefault } from "~/shared/i18n";
import { cn } from "@/shared/lib/utils";

interface Language {
  code: string;
  label: string;
  region: string;
}

const LANGUAGES: Language[] = [
  { code: "ru", label: "Русский", region: "Россия" },
  { code: "en", label: "English", region: "United States" },
  { code: "kz", label: "Қазақша", region: "Қазақстан" },
];

export const LangSwitcher: FC = () => {
  const pageContext = usePageContext();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = pageContext.locale || localeDefault;

  const currentLanguage = LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  const changeLanguage = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
    const currentPath = pageContext.urlParsed.pathname;

    let pathWithoutLocale = currentPath;
    if (currentLocale !== localeDefault) {
      pathWithoutLocale = currentPath.replace(new RegExp(`^/${currentLocale}`), "") || "/";
    }

    const cleanPath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;

    const newPath =
      newLocale === localeDefault
        ? pathWithoutLocale
        : `/${newLocale}${cleanPath}`;

    navigate(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full",
          "text-gray-600",
          "hover:bg-gray-100 transition-colors",
          "focus:outline-none"
        )}
      >
        <Globe className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-scale-in">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Выберите язык и регион
              </p>
            </div>
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => changeLanguage(language.code)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3",
                  "hover:bg-gray-50 transition-colors text-left"
                )}
              >
                <div>
                  <div
                    className={cn(
                      "font-medium",
                      currentLocale === language.code
                        ? "text-sky-500"
                        : "text-gray-900"
                    )}
                  >
                    {language.label}
                  </div>
                  <div className="text-sm text-gray-500">{language.region}</div>
                </div>
                {currentLocale === language.code && (
                  <Check className="h-5 w-5 text-sky-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
