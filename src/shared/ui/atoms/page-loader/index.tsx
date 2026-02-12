import { Loader } from "lucide-react";
import type { FC } from "react";

export const PageLoader: FC = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Loader className="size-6 animate-spin" />
    </div>
  );
};
