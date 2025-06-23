import { appData } from "src/shared/lib/data";

const FeaturesContainer = () => {
  //===================================================================================================
  //==========================={Translations Block}====================================================
  //===================================================================================================
  const { casino } = appData.malaysia.english;
  //===================================================================================================
  //================================={React states}====================================================
  //===================================================================================================
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start text-left text-sm text-dimgray font-roboto`}
    >
      <div className="self-stretch flex flex-row items-center justify-start flex-wrap content-center py-0 pl-0 pr-[65px] box-border gap-2.5">
        <div className="h-[30px] w-[78px] rounded-9980xl bg-white border-gainsboro-200 border-[1px] border-solid box-border flex flex-col items-center justify-center py-1.5 px-[11px]">
          <div className="w-[48px] flex-1 flex flex-row items-center justify-start">
            <div className="self-stretch flex-1 flex flex-row items-start justify-start">
              <div className="self-stretch flex-1 relative tracking-[0.25px] leading-[18px]">
                {casino}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesContainer;
