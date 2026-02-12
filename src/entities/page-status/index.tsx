import { CircleX, FolderSearch } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const iconProps = {
  className: "size-24",
  strokeWidth: 1,
};

type TProps = {
  type?: 404 | 500;
};

const OPTIONS = {
  404: {
    title: "pageNotFound",
    icon: <FolderSearch {...iconProps} />,
    color: "text-brand",
    iconColor: "text-brand/60",
  },
  500: {
    title: "internalServerError",
    icon: <CircleX {...iconProps} />,
    color: "text-red-400",
    iconColor: "text-red-400/80",
  },
};

export const PageStatus: FC<TProps> = ({ type = 404 }) => {
  const { t: tErrors } = useTranslation('errors');
  const { t: tCommon } = useTranslation('common');
  const { title, icon, color, iconColor } = OPTIONS[type];

  return (
    <div className="flex flex-col items-center justify-center gap-y-12">
      <div className="w-full flex flex-col items-center justify-center gap-y-2">
        <h1 className={`font-semibold text-3xl ${color}`}>{type}</h1>
        <p className="text-lg">{tErrors(title as any)}</p>
        <a href="" className={`underline ${color}`}>
          {tCommon("toHome")}
        </a>
      </div>

      <span className={iconColor}>{icon}</span>
    </div>
  );
};
