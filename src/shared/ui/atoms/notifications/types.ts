import type { ToastType } from "react-hot-toast";

export type TOptions = {
  type: ToastType;
  message: string;
  description?: string;
  action?: {
    name: string;
    callBack: VoidFunction;
  };
};

export type TAction = Omit<TOptions, "type">;
