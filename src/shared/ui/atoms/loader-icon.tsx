import { LoaderCircle } from "lucide-react";
import type { FC } from "react";

import { cn } from "@/shared/lib/utils";

type TProps = {
  className?: string;
};

export const LoaderIcon: FC<TProps> = ({ className }) => (
  <LoaderCircle className={cn("size-6 animate-spin", className)} />
);
