import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tablet } from "src/widgets/tablet";

const BlackPage = (props) => {
  const {
    isPWA,
    deferredPrompt,
    initializeInstall,
    handleInstallClick,
    showLoadingBar,
    progress,
    isInstalled,
    domain,
    device,
    isBot,
    os,
    browserName,
    deviceType,
    country,
    language,
  } = props;
  const navigate = useNavigate();
  // //=============={Device detector Logic}=====================================
  //====={ios devices}====================
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isIosSmartPhoneOnChrome, setIsIosSmartPhoneOnChrome] = useState(false);
  const [isIosSmartPhoneOnSafari, setIsIosSmartPhoneOnSafari] = useState(false);
  const [isIosTabletOnChrome, setIsIosTabletOnChrome] = useState(false);
  const [isIosTabletOnSafari, setIsIosTabletOnSafari] = useState(false);
  const [isIosDesktopOnChrome, setIsIosDesktopOnChrome] = useState(false);
  const [isIosDesktopOnSafari, setIsIosDesktopOnSafari] = useState(false);
  //====={android devices on chrome}====================
  const [isAndroidSmartPhoneOnChrome, setIsAndroidSmartPhoneOnChrome] =
    useState(false);
  const [isAndroidTabletOnChrome, setIsAndroidTabletOnChrome] = useState(false);
  const [isAndroidDesktopOnChrome, setIsAndroidDesktopOnChrome] =
    useState(false);

  const [isWindowsSmartPhoneOnChrome, setIsWindowsSmartPhoneOnChrome] =
    useState(false);
  const [isWindowsTabletOnChrome, setIsWindowsTabletOnChrome] = useState(false);
  const [isWindowsDesktopOnChrome, setIsWindowsDesktopOnChrome] =
    useState(false);

  //========{others}==========
  const [isOtherBrowser, setIsOtherBrowser] = useState(false);

  // redirect to home screen if PWA
  async function redirectUser() {
    if (isPWA) {
      navigate("/");
    }
  }

  useEffect(() => {
    redirectUser();
  }, [isPWA]);

  //====={detecting system default theme}=============================
  useEffect(() => {
    // Check the system's default theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes in the theme
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (device) {
      selectPopUpByDeviceTypeBrowserNameAndOS();
    }
  }, [device]);

  async function selectPopUpByDeviceTypeBrowserNameAndOS() {
    //========={desktop options}===================================

    if (deviceType === "desktop") {
      if (os === "Mac") {
        if (browserName === "Chrome") {
          setIsIosDesktopOnChrome(true);
        } else if (browserName === "Safari") {
          setIsIosDesktopOnSafari(true);
        } else {
          setIsOtherBrowser(true);
        }
      }
      if (os === "Windows") {
        if (browserName === "Chrome") {
          setIsWindowsDesktopOnChrome(true);
        } else {
          setIsOtherBrowser(true);
        }
      }
      if (os === "Android") {
        if (browserName === "Chrome") {
          setIsAndroidDesktopOnChrome(true);
        } else {
          setIsOtherBrowser(true);
        }
      }
    }
    //========={tablet options}===================================
    if (deviceType === "tablet") {
      if (os === "iOS") {
        if (browserName === "Chrome") {
          setIsIosTabletOnChrome(true);
        } else if (browserName === "Safari") {
          setIsIosTabletOnSafari(true);
        } else {
          setIsOtherBrowser(true);
        }
      }
      if (os === "Android") {
        if (browserName === "Chrome") {
          setIsAndroidTabletOnChrome(true);
        } else {
          setIsOtherBrowser(true);
        }
      }

      if (os === "Windows") {
        if (browserName === "Chrome") {
          setIsAndroidTabletOnChrome(true);
        } else {
          setIsOtherBrowser(true);
        }
      }
    }

    //========={smart phone options}===================================
    if (deviceType === "smartphone") {
      if (os === "iOS") {
        // setIsIosSmartPhoneOnSafari(true);
        if (browserName === "Chrome") {
          setIsIosSmartPhoneOnChrome(true);
        } else if (browserName === "Chrome Mobile iOS") {
          setIsIosSmartPhoneOnChrome(true);
        } else if (browserName === "Safari") {
          setIsIosSmartPhoneOnSafari(true);
        } else if (browserName === "Mobile Safari") {
          setIsIosSmartPhoneOnSafari(true);
        } else {
          setIsOtherBrowser(true);
        }
      }
      if (os === "Android") {
        setIsAndroidSmartPhoneOnChrome(true);
        // if (browserName === "Chrome") {
        //   setIsAndroidSmartPhoneOnChrome(true);
        // } else {
        //   //now its always going to be AndroidSmartPhoneOnChrome
        //   setIsAndroidSmartPhoneOnChrome(true);
        //   // setIsOtherBrowser(true);
        // }
      }
      if (os === "Windows") {
        if (browserName === "Chrome") {
          setIsWindowsSmartPhoneOnChrome(true);
        } else {
          setIsOtherBrowser(true);
        }
      }
    }
  }

  // if there is device and it is not a bot, then this page will render according to the logic

  return (
    <>
      <Tablet
        deferredPrompt={deferredPrompt}
        initializeInstall={initializeInstall}
        handleInstallClick={handleInstallClick}
        device={device}
        isBot={isBot}
        isIosSmartPhoneOnChrome={isIosSmartPhoneOnChrome}
        isDarkMode={isDarkMode}
        isIosSmartPhoneOnSafari={isIosSmartPhoneOnSafari}
        isIosTabletOnChrome={isIosTabletOnChrome}
        isIosTabletOnSafari={isIosTabletOnSafari}
        isIosDesktopOnChrome={isIosDesktopOnChrome}
        isIosDesktopOnSafari={isIosDesktopOnSafari}
        isAndroidSmartPhoneOnChrome={isAndroidSmartPhoneOnChrome}
        isAndroidTabletOnChrome={isAndroidTabletOnChrome}
        isAndroidDesktopOnChrome={isAndroidDesktopOnChrome}
        isWindowsSmartPhoneOnChrome={isWindowsSmartPhoneOnChrome}
        isWindowsTabletOnChrome={isWindowsTabletOnChrome}
        isWindowsDesktopOnChrome={isWindowsDesktopOnChrome}
        isOtherBrowser={isOtherBrowser}
        domain={domain}
        showLoadingBar={showLoadingBar}
        progress={progress}
        isInstalled={isInstalled}
        country={country}
        language={language}
      />
    </>
  );
};

export default BlackPage;
