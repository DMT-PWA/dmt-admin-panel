import React, { useEffect, useState } from "react";
/**
 * Progress bar for uploading
 * @returns
 */

const ProcessBar = (props) => {
  const { progress } = props;

  const [size, setSize] = useState(0);
  const [maxSize, maxSetSize] = useState(7);

  useEffect(() => {
    getProgressLevel();
  }, [progress]);

  async function getProgressLevel() {
    if (progress === 0) {
      setSize(0);
    }

    if (progress === 10) {
      setSize(1.1);
    }

    if (progress === 20) {
      setSize(1.8);
    }

    if (progress === 30) {
      setSize(2.5);
    }

    if (progress === 40) {
      setSize(2.9);
    }

    if (progress === 50) {
      setSize(3.5);
    }

    if (progress === 60) {
      setSize(4.0);
    }

    if (progress === 70) {
      setSize(4.4);
    }

    if (progress === 80) {
      setSize(5.0);
    }

    if (progress === 90) {
      setSize(6.2);
    }
    if (progress === 100) {
      setSize(7);
    }
  }

  const content = (
    <>
      <button
        className={`cursor-pointer hover:opacity-80 [border:none] py-2 px-5 self-stretch rounded-lg overflow-hidden flex flex-row items-start justify-center bg-onexBlueLight tabletBlack:bg-seagreen-500 w-full`}
        // style={{ width: `${progress}%`, transition: "width 1s ease-out" }}
      >
        <div className="relative text-sm tracking-[0.25px] leading-[20px] font-roboto text-neutral-100 text-left inline-block min-w-[40px]">
          {`${size} MB /${maxSize} MB`}
        </div>
      </button>
    </>
  );

  return <>{content}</>;
};

export default ProcessBar;
