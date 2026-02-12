import type { FC } from "react";

import { PageStatus } from "@/entities/page-status";

export const ErrorComponent: FC = () => (
  <div className="w-full h-[100vh] flex items-center justify-center">
    <PageStatus type={500} />
  </div>
);
