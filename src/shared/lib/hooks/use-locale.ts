import dayjs from "dayjs";
import { useUnit } from "effector-react";

import { $locale } from "~/shared/i18n";

export const useLocale = () => {
  const locale = useUnit($locale);

  dayjs.locale(locale === "en" ? "en" : locale === "kz" ? "kk" : "ru");
};
