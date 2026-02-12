import clsx from "clsx";
import { X } from "lucide-react";
import type { Renderable, Toast, ToastType, ValueFunction } from "react-hot-toast";
import toast from "react-hot-toast";

import { SETTINGS } from "./lib";

export const createNotificationComponent =
  ({
    type: _type,
    message,
    description,
    action,
  }: {
    message: string;
    type: ToastType;
    description?: string;
    action?: {
      name: string;
      callBack: VoidFunction;
    };
  }): ValueFunction<Renderable, Toast> =>
  ({ id, visible }) => {
    const { icon: Icon, color } = SETTINGS[_type];

    return (
      <div
        role="button"
        tabIndex={-1}
        data-visible={visible}
        // eslint-disable-next-line
        className={clsx(
          "flex cursor-default flex-col gap-y-2 rounded-lg border px-3 py-2 shadow-md",
          color,
        )}
      >
        <div className="flex w-full items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-2">
            <Icon className={_type === "loading" ? "animate-spin" : ""} />
            <p>{message}</p>
          </div>
          <button
            onClick={() => toast.dismiss(id)}
            className="hover:text-unset flex size-4 items-center justify-center hover:bg-transparent hover:opacity-70"
          >
            <X className="text-gray-500" />
          </button>
        </div>

        {description && (
          <>
            <hr className={color} />
            <p>{description}</p>
          </>
        )}

        {!!action && (
          <button
            onClick={action.callBack}
            className="flex items-center text-primary-blue-300 transition-all hover:opacity-70"
          >
            {action.name}
          </button>
        )}
      </div>
    );
  };
