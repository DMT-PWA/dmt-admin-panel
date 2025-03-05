import { FC } from "react";

import phoneBg from "src/shared/assets/images/phone_bg.png";

export const PhonePreview: FC = () => {
  return (
    <div>
      <div
        style={{
          width: "411px",
          height: "849px",
          backgroundImage: `url(${phoneBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <button></button>
    </div>
  );
};
