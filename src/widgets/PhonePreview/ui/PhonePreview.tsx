import { FC, useEffect, useState } from "react";
import axios from "axios";
import DeviceDetector from "device-detector-js";
import { useParams } from "react-router-dom";
import phoneBg from "src/shared/assets/images/phone_bg.png";
import BlackPage from "./BlackPage";
const backend = import.meta.env.VITE_BACKEND_URL;
const frontend = import.meta.env.VITE_FRONTEND_URL;
const appId = import.meta.env.VITE_APP_ID;
const domainName = import.meta.env.VITE_DOMAIN_NAME;

export const PhonePreview: FC = (props) => {
  const {
    isPWA,
    userId,
    setUserId,
    deferredPrompt,
    initializeInstall,
    isInstalled,
    country,
    language,
  } = props;
  const params = useParams();

  //===={One signal}============
  //===={One signal}==========================

  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [progress, setProgress] = useState(0);

  //=============={Device detector Logic}=====================================
  const deviceDetector = new DeviceDetector();
  // const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36";
  // const currentUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)";
  const [originalPath, setOriginalPath] = useState();
  const [reducedPath, setReducedPath] = useState();
  const [domain, setDomain] = useState();

  const [userAgent, setUserAgent] = useState();
  const [device, setDevice] = useState();
  const [bot, setBot] = useState();
  const [isBot, setIsBot] = useState(false);
  const [os, setOs] = useState(); // iOS, Mac,
  const [browserName, setBrowserName] = useState(); // chrome, safari, Mobile Safari, edge
  const [deviceType, setDeviceType] = useState(); // desktop, smartPhone, tablet

  /*  useEffect(() => {
    signUp();
  }, [device]); */

  //========={app installer for android}============================================

  const handleInstallClick = async () => {
    // setOpenPopMenu(true)
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the native install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          handleUserAcceptsInstall();
        } else {
          setDeferredPrompt(null); // Clear the deferred prompt so it can't be used again
          console.log("User dismissed the install prompt");
        }
      });
    }
  };

  const handleUserAcceptsInstall = () => {
    console.log("User accepted the install prompt");

    setShowLoadingBar(true);
    // Simulate the progress of installation
    let progressPercentage = 0;
    const interval = setInterval(() => {
      progressPercentage += 10; // Increment progress
      setProgress(progressPercentage);
      if (progressPercentage >= 100) {
        clearInterval(interval); // Stop the progress simulation
        setIsInstalled(true); // set is installed
        console.log("Installation assumed complete"); // You can't know this for sure
      }
      // }, 900); // Adjust time interval as needed (requires 8.6 seconds which is 860)
      // }, 1070); // Adjust time interval as needed (requires 10.69 seconds which is 1069)
    }, 1400); // Adjust time interval as needed (requires 14 seconds which is 1400) to allow for extra time
  };

  //=============={Device detector Logic}=====================================

  /**
   * 
   * //====={ios devices}====================
   1. ios smartphone on chrome
   2. ios smartphone on safari
    3. ios tablet on chrome
   4. ios tablet on safari
    5. ios desktop on chrome
   6. ios desktop on safari
   * //====={android devices on chrome}====================

   7. android smartphone
   8. android tablet
   9.android desktop

   //========{others}==========
   10 any (smartphone, tablet, desktop)

   * 
   */

  useEffect(() => {
    const currentPathUrl = window.location.href;

    setOriginalPath(currentPathUrl);

    const reducedUrl = currentPathUrl.replace(/^https?:\/\//, "");

    setReducedPath(reducedUrl);

    const urlObj = new URL(currentPathUrl);

    const currentDomain = urlObj.hostname;
    setDomain(currentDomain);
    const currentUserAgent = navigator.userAgent;
    setUserAgent(currentUserAgent);

    if (currentUserAgent) {
      const currentDevice = deviceDetector.parse(currentUserAgent);
      setDevice(currentDevice);
      setOs(currentDevice?.os.name);
      setBrowserName(currentDevice?.client?.name);
      setDeviceType(currentDevice?.device?.type);
      setBot(currentDevice?.bot);
      if (currentDevice?.bot?.name) {
        setIsBot(true);
      }
    }
  }, []);

  //=============={Device detector Logic}=====================================

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
        {
          <BlackPage
            isPWA={isPWA}
            deferredPrompt={deferredPrompt}
            initializeInstall={initializeInstall}
            handleInstallClick={handleInstallClick}
            showLoadingBar={showLoadingBar}
            progress={progress}
            isInstalled={isInstalled}
            originalPath={originalPath}
            reducedPath={reducedPath}
            // domain={domain}
            domain={domainName}
            userAgent={userAgent}
            device={device}
            bot={bot}
            isBot={isBot}
            os={os}
            browserName={browserName}
            deviceType={deviceType}
            country={country}
            language={language}
          />
        }
      </div>
    </div>
  );
};
