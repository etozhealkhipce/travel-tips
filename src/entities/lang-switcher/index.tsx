import type { FC } from "react";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";
import { useTranslation } from "react-i18next";
import { Select } from "@/shared/ui/molecules";
import { localeDefault } from "~/shared/i18n";

const LANGUAGES = [
  { value: "ru", label: "Русский" },
  { value: "kz", label: "Қазақша" },
  { value: "en", label: "English" },
];

export const LangSwitcher: FC = () => {
  const pageContext = usePageContext();
  const { i18n } = useTranslation();
  const currentLocale = pageContext.locale || localeDefault;
  
  const changeLanguage = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
    const currentPath = pageContext.urlParsed.pathname;
    
    let pathWithoutLocale = currentPath;
    if (currentLocale !== localeDefault) {
      pathWithoutLocale = currentPath.replace(new RegExp(`^/${currentLocale}`), '') || '/';
    }
    
    const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
    
    const newPath = newLocale === localeDefault 
      ? pathWithoutLocale
      : `/${newLocale}${cleanPath}`;
    
    navigate(newPath);
  };

  return (
    <Select
      className="w-28"
      options={LANGUAGES}
      value={currentLocale}
      onChange={changeLanguage}
      triggerClassName="min-w-[unset]"
    />
  );
};
