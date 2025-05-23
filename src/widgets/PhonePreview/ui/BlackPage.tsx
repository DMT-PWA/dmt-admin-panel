import { FC, useEffect, useState } from "react";
import { Tablet } from "src/widgets/tablet";
import { AboutPage } from "src/entities/playStore";
import { useAppSelector } from "src/shared/lib/store";
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

const BlackPage: FC<PropsValue> = (props) => {
  const { descriptionState } = props.value;

  const [stage, setStage] = useState<{ id: number; stage: string } | null>(
    null
  );
  const { about_description } = descriptionState;

  const {
    android_version,
    description,
    last_update,
    release_date,
    version,
    whats_new,
  } = about_description;

  const { number_of_downloads } = descriptionState;

  const { currentLanguage, currentCountry } = useAppSelector(
    (state) => state.pwa_design
  );

  useEffect(() => {
    setStage({ id: 0, stage: "Main" });
  }, []);

  const handleCurrentStage = () => {
    if (stage?.stage === "Main") {
      return (
        <Tablet
          toAbout={() => setStage({ id: 1, stage: "About" })}
          value={props.value}
        />
      );
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

  return <>{handleCurrentStage()}</>;
};

export default BlackPage;
