import { FC } from "react";
import phoneBg from "src/shared/assets/images/phone_bg.png";
import BlackPage from "./BlackPage";

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
          display: "flex",
          overflowY: "clip",
          padding: "18px",
        }}
      >
        {<BlackPage />}
      </div>
    </div>
  );
};
