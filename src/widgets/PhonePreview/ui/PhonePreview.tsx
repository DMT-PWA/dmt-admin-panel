import { FC } from "react";
import phoneBg from "src/shared/assets/images/phone_bg.png";
import BlackPage from "./BlackPage";
import { CombinedDescription } from "src/entities/pwa_description";
import { ICommentsState } from "src/entities/comments";
import { ICollection } from "src/shared/types";

type PropsValue = {
  value: {
    descriptionState: CombinedDescription;
    commentState: ICommentsState;
    collectionState: ICollection | null;
  };
};

export const PhonePreview: FC<PropsValue> = (props) => {
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
        {<BlackPage value={props.value} />}
      </div>
    </div>
  );
};
