import React from "react";
import UploadBar from "./UploadBar";

const Loading = (props) => {
    const {progress} = props
  return (
    <div
      className={`cursor-pointer hover:opacity-80 [border:none] self-stretch rounded-lg overflow-hidden flex flex-row items-start justify-center bg-onexBlue tabletBlack:hover:bg-seagreen-400 tabletBlack:bg-seagreen-100 w-full`}
    >
      <div className="h-fit flex flex-col items-center justify-center w-full text-center text-neutral-100">
        <UploadBar progress={progress} />
      </div>
    </div>
  );
};

export default Loading;
