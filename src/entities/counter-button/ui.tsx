import { useUnit } from "effector-react";
import type { FC } from "react";
import { Button } from "@/shared/ui/atoms";
import { $$counterModel } from "./model";

export const Counter: FC = () => {
  const [clicksCount, buttonClicked] = useUnit([
    $$counterModel.$clicksCount,
    $$counterModel.buttonClicked,
  ]);

  return (
    <Button onClick={buttonClicked} className="min-w-[100px] animate-fade-in">
      {clicksCount}
    </Button>
  );
};
