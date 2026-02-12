import type React from "react";
import { useMemo } from "react";

import { fork } from "effector";
import { Provider } from "effector-react";
import { I18nextProvider } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { createI18nInstance } from "~/shared/i18n/i18n";
import { localeDefault } from "~/shared/i18n";

export default function WrapperEffector({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const i18n = useMemo(() => createI18nInstance(pageContext.locale || localeDefault), [pageContext.locale]);
  
  return (
    <I18nextProvider i18n={i18n}>
      <Provider value={fork({ values: pageContext.scopeValues })}>
        {children}
      </Provider>
    </I18nextProvider>
  );
}