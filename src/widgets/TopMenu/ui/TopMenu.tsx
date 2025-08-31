import { FC } from "react";
import { LogoIcon } from "src/shared/assets/icons/LogoIcon";
export const TopMenu: FC = () => {
  return (
    <div className="flex border-b-[1px] border-gray-7">
      <LogoIcon />
    </div>
  );
};
