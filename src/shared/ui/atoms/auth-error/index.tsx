import { ShieldX } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/layouts";

import { RoundedBox } from "../rounded-box";

export const AuthError: FC = () => {
  const { t: tAuth } = useTranslation('auth');
  const { t: tCommon } = useTranslation('common');

  return (
    <Layout mainTagClasses="bg-pink-100/50">
      <div className="size-full flex items-center justify-center pb-[200px] animate-slide-down">
        <RoundedBox className="w-[90%] max-w-[400px] px-4 py-7 flex flex-col items-center justify-center text-center">
          <ShieldX className="size-12 mb-4 text-red-500" />
          <h1 className="text-2xl font-semibold">{tAuth("title")}</h1>
          <div className="text-gray-500 my-4">
            <p>{tAuth("subtitle1")}</p>
            <p>{tAuth("subtitle2")}</p>
          </div>
          <a href="/" className="underline text-blue-400">
            {tCommon("toHome")}
          </a>
        </RoundedBox>
      </div>
    </Layout>
  );
};
