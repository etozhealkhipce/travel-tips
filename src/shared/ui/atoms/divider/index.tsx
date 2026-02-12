import { cn } from "@shared/lib/utils";
import type { FC } from "react";

type TProps = {
  className?: string;
};

export const Divider: FC<TProps> = ({ className }) => {
  return <hr className={cn(className, "w-full bg-gray-100")} />;
};
