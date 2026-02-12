import { Ban, Check, Info, Loader2, X } from "lucide-react";
import type { ToastType } from "react-hot-toast";

import type { TAction } from "./types";

export const notifyHelper = (options: string | TAction, type: ToastType) => {
  if (typeof options === "string") {
    return {
      type,
      message: options,
    };
  } else {
    const { message, description, action } = options;

    return {
      type,
      message,
      description,
      action,
    };
  }
};

export const SETTINGS = {
  success: {
    icon: Check,
    color: "border-green-500 bg-green-50 text-green-500",
  },
  error: {
    icon: Ban,
    color: "border-red-500 bg-red-50 text-red-500",
  },
  blank: {
    icon: Info,
    color: "border-blue-500 bg-blue-50 text-blue-500",
  },
  loading: {
    icon: Loader2,
    color: "border-blue-500 bg-blue-50 text-blue-500",
  },
  custom: {
    icon: X,
    color: "border-blue-500 bg-blue-50 text-blue-500",
  },
};
