import type { Locale } from "date-fns";
import type { AnchorHTMLAttributes } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { localeDefault } from "~/shared/i18n";

interface LocaleLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  locale?: Locale;
}

export function LocaleLink({ href, locale, ...props }: LocaleLinkProps) {
  const pageContext = usePageContext();
  const currentLocale = locale ?? pageContext?.locale ?? localeDefault;
  
  // Добавляем префикс только для НЕ-дефолтных локалей (как в Vike примере)
  const localizedHref = currentLocale === localeDefault 
    ? href 
    : `/${currentLocale}${href}`;
  
  return <a href={localizedHref} {...props} />;
}
