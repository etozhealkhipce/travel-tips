import type { FC } from "react";
import { cn } from "@/shared/lib/utils";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select as ShaSelect,
} from "@/shared/ui/shadcn";
import { Label } from "../../atoms/label";

type TProps = {
  value?: string;
  isError?: boolean;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  defaultValue?: string;
  errorMessage?: string;
  label?: string | number;
  triggerClassName?: string;
  onChange?: (v: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  groups?: {
    id: string;
    label: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
};

export const Select: FC<TProps> = ({
  label,
  value,
  groups,
  options,
  isError,
  onChange,
  placeholder,
  defaultValue,
  errorMessage,
  className = "",
  disabled = false,
  triggerClassName,
  isLoading = false,
}) => (
  <div className={className}>
    {label && <Label className="mb-2">{label}</Label>}
    <ShaSelect
      value={value}
      onValueChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled || isLoading}
    >
      <SelectTrigger
        isLoading={isLoading}
        className={cn("min-w-[150px]", triggerClassName, isError && "border-red-400")}
      >
        <SelectValue
          onClick={(e) => e.stopPropagation()}
          placeholder={<p className="text-gray-400">{placeholder}</p>}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(({ label, value }, index) => (
            <SelectItem key={index} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>

        {groups?.map(({ id, label, options }) => (
          <SelectGroup key={id}>
            <SelectLabel>{label}</SelectLabel>
            {options.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </ShaSelect>
    {errorMessage && <div className="text-xs text-red-400 mt-1">{errorMessage}</div>}
  </div>
);
