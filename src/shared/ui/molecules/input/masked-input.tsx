import type { FC, ReactNode, RefAttributes } from "react";
import ReactInputMask from "react-input-mask";

import type { InputProps } from "../../shadcn";
import { BaseInput } from "./base-input";
import type { TProps } from "./types";

export const MaskedInput: FC<
  TProps & {
    mask: Required<TProps>["mask"];
  }
> = ({ ...props }) => {
  return (
    <ReactInputMask {...props}>
      {
        ((inputProps: JSX.IntrinsicAttributes & InputProps & RefAttributes<HTMLInputElement>) => {
          return <BaseInput {...props} {...inputProps} />;
        }) as unknown as ReactNode
      }
    </ReactInputMask>
  );
};
