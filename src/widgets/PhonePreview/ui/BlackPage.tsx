import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tablet } from "src/widgets/tablet";
import { AboutPage } from "src/entities/playStore";
import { useAppSelector } from "src/shared/lib/store";

const BlackPage: FC = (props) => {
  const { isPWA, device, os, browserName, deviceType } = props;
  const navigate = useNavigate();
  // //=============={Device detector Logic}=====================================
  //====={ios devices}====================
  const [stage, setStage] = useState<{ id: number; stage: string } | null>(
    null
  );
  const [, setIsDarkMode] = useState(false);
  const [, setIsIosSmartPhoneOnChrome] = useState(false);
  const [, setIsIosSmartPhoneOnSafari] = useState(false);
  const [, setIsIosTabletOnChrome] = useState(false);
  const [, setIsIosTabletOnSafari] = useState(false);
  const [, setIsIosDesktopOnChrome] = useState(false);
  const [, setIsIosDesktopOnSafari] = useState(false);
  //====={android devices on chrome}====================
  const [, setIsAndroidSmartPhoneOnChrome] = useState(false);
  const [, setIsAndroidTabletOnChrome] = useState(false);
  const [, setIsAndroidDesktopOnChrome] = useState(false);

  const [, setIsWindowsSmartPhoneOnChrome] = useState(false);
  const [, setIsWindowsTabletOnChrome] = useState(false);
  const [, setIsWindowsDesktopOnChrome] = useState(false);

  //========{others}==========
  const [, setIsOtherBrowser] = useState(false);

  const {
    android_version,
    description,
    last_update,
    release_date,
    version,
    whats_new,
  } = useAppSelector((state) => state.pwa_description.about_description);

  const { number_of_downloads } = useAppSelector(
    (state) => state.pwa_description
  );

  const { currentLanguage, currentCountry } = useAppSelector(
    (state) => state.pwa_design
  );

  // redirect to home screen if PWA
  async function redirectUser() {
    if (isPWA) {
      navigate("/");
    }
  }

  useEffect(() => {
    setStage({ id: 0, stage: "Main" });
  }, []);

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

  const handleCurrentStage = () => {
    if (stage?.stage === "Main") {
      return <Tablet toAbout={() => setStage({ id: 1, stage: "About" })} />;
    }

    if (stage?.stage === "About") {
      return (
        <div
          data-phone-container
          className="flex flex-col pt-14.5 overflow-y-auto "
        >
          <div
            className="self-start px-6.25 rotate-180"
            onClick={() => setStage({ id: 0, stage: "Main" })}
          >
            <img
              className="w-4 h-3.5 relative"
              alt=""
              src="/pwa_icons/vector-5.svg"
            />
          </div>
          <AboutPage
            android_version={android_version}
            description={description}
            last_update={last_update}
            release_date={release_date}
            version={version}
            whats_new={whats_new}
            number_of_downloads={number_of_downloads}
            currentLanguage={currentLanguage}
            currentCountry={currentCountry}
          ></AboutPage>
        </div>
      );
    }
  };

  // if there is device and it is not a bot, then this page will render according to the logic

  return <>{handleCurrentStage()}</>;
};

export default BlackPage;
