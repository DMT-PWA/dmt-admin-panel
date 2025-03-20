import { useState, useEffect } from 'react';
import ProcessBar from "./ProcessBar";

/**
 * Uploading bar
 * @returns 
 */
const UploadBar = (props) => {
  const {progress} = props
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => {
  //       const newProgress = prevProgress + 10;
  //       if (newProgress >= 100) {
  //         clearInterval(timer);
  //         return 100; // Stops at 100%
  //       }
  //       return newProgress;
  //     });
  //   }, 200); // Updates every 400ms

  //   return () => {
  //     clearInterval(timer); 
  //   };
  // }, []);

  return (
    <div className="self-stretch flex flex-row items-center justify-start gap-[0.562rem] text-center text-[0.75rem] text-neutral-100">
      <ProcessBar progress={progress} />
    </div>
  );
};

export default UploadBar;
