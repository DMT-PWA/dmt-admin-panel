import { appData } from "src/shared/lib/data";

const SessionSafety2 = ({ className = "" }) => {
  //===================================================================================================
  //==========================={Redux Block}====================================================
  //===================================================================================================
  const { dataSafety, safety, noInformation, seeDetails } = appData;
  //===================================================================================================
  //================================={React states}====================================================
  //===================================================================================================
  return (
    <div
      className={`w-full flex flex-col items-start justify-start gap-5 max-w-full text-left text-lg text-dimgray font-roboto ${className}`}
    >
      <div className="self-stretch h-6 flex flex-row items-center justify-between gap-5 text-gray-100">
        <div className="self-stretch w-full flex flex-row items-start justify-start">
          <div className="self-stretch flex-1 relative leading-[24px]">
            {dataSafety}
          </div>
        </div>
        <div className="overflow-hidden flex flex-col items-start justify-start py-[5px] px-1">
          <img className="w-4 h-3.5 relative" alt="" src="/vector-5.svg" />
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-row items-start justify-start max-w-full text-smi">
        <div className="h-fit flex-1 relative tracking-[0.2px] leading-[20px] inline-block max-w-full">
          {safety}
        </div>
      </div>
      <div className="self-stretch h-fit rounded-lg border-gainsboro-200 border-[1px] border-solid box-border flex flex-col items-start justify-start py-5 px-[19px] gap-5 text-sm">
        <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-5">
          <div className="self-stretch flex-1 flex flex-row items-start justify-start py-0 px-0 gap-5">
            <div className="self-stretch w-[258px] flex flex-col items-start justify-start gap-[5px] shrink-0">
              <div className="self-stretch flex-1 flex flex-row items-start justify-start">
                <div className="self-stretch w-[210px] relative tracking-[0.2px] leading-[20px] inline-block">
                  {noInformation}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-5 flex flex-row items-start justify-start py-0 px-3 box-border text-onexBlueLight tabletBlack:text-seagreen-300">
          <div className="self-stretch w-full relative tracking-[0.15px] leading-[20px] inline-block">
            {seeDetails}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSafety2;
