import type { FC, ReactNode } from "react";

import { useLocale } from "@/shared/lib/hooks";
import type { TChildren } from "@/shared/types/common";

type TProps = {
  children: ReactNode;
  mainTagClasses?: string;
  ExtraHeaderContent?: TChildren;
  ExtraFooterContent?: TChildren;
};

export const Layout: FC<TProps> = ({
  children,
  mainTagClasses,
  ExtraHeaderContent,
  ExtraFooterContent,
}) => {
  useLocale();

  return (
    <div className="bg-gray-200 overflow-hidden flex flex-col h-screen">
      {ExtraHeaderContent}

      <main className={`flex-grow overflow-y-auto p-4 app-scroll ${mainTagClasses}`}>
        {children}
      </main>

      {ExtraFooterContent}
    </div>
  );
};
