import { useUnit } from "effector-react";
import { $$authModel } from "@/shared/store/user";
import { Button } from "~/shared/ui/atoms";
import { LangSwitcher } from "~/entities/lang-switcher";


export const LayoutHeader = () => {
  const [isAuthorized, logout] = useUnit([$$authModel.$isAuthorized, $$authModel.logout]);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="font-bold text-lg text-blue-600">Travel Tips</div>
      <div className="flex items-center gap-4">
        <LangSwitcher />
        {isAuthorized && (
          <Button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};
