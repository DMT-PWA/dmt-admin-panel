import PropTypes from "prop-types";

const Footer = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-col items-start justify-start gap-6 max-w-full text-left text-sm text-dimgray font-roboto ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-5 box-border max-w-full text-gray-100">
        <div className="flex-1 flex flex-col items-start justify-start gap-5 max-w-full">
          <div className="flex flex-row items-start justify-start gap-5">
            <div className="overflow-hidden flex flex-row items-center justify-start py-[2.3px] px-[3px] box-border w-[18px] h-[18px]">
              <img
                className="h-[13.3px] w-[11.7px] relative"
                alt=""
                src="/vector-21.svg"
              />
            </div>
            <div className="relative tracking-[0.25px] leading-[20px]">
              Flag as inappropriate
            </div>
          </div>
          <div className="self-stretch h-px relative bg-whitesmoke-200" />
        </div>
      </div>
      <div className="flex flex-row items-start justify-start py-0 px-5">
        <div className="flex flex-col items-start justify-start">
          <div className="relative tracking-[0.25px] leading-[32px] inline-block min-w-[79px]">
            Google Play
          </div>
          <div className="relative text-xs tracking-[0.2px] leading-[32px] inline-block min-w-[55px] z-[1]">
            Play Pass
          </div>
          <div className="relative text-smi tracking-[0.2px] leading-[32px] inline-block min-w-[68px] z-[2]">
            Play Points
          </div>
          <div className="relative tracking-[0.2px] leading-[32px] inline-block min-w-[62px] z-[3]">
            Gift cards
          </div>
          <div className="relative tracking-[0.2px] leading-[32px] inline-block min-w-[55px] z-[4]">
            Redeem
          </div>
          <div className="relative tracking-[0.2px] leading-[32px] inline-block min-w-[88px] z-[5]">
            Refund policy
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-px max-w-full text-xs">
        <div className="self-stretch flex flex-row items-start justify-start py-0 px-5 box-border max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start pt-0 pb-5 pl-0 pr-[23px] box-border gap-5 max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-5">
              <div className="flex flex-row items-start justify-start gap-5">
                <div className="relative leading-[20px] inline-block min-w-[93px]">
                  Terms of service
                </div>
                <a className="[text-decoration:none] w-[46px] relative leading-[20px] text-[inherit] inline-block shrink-0">
                  Privacy
                </a>
                <div className="relative leading-[20px] inline-block min-w-[104px]">
                  About Google Play
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-5">
                <div className="relative leading-[20px] inline-block min-w-[80px]">
                  Google Store
                </div>
                <div className="relative leading-[20px] inline-block min-w-[70px]">
                  Developers
                </div>
                <div className="relative leading-[20px] inline-block min-w-[122px]">
                  All prices include VAT.
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start pt-0 px-0 pb-px gap-0.5">
              <div className="relative leading-[20px] inline-block min-w-[37px]">
                Russia
              </div>
              <div className="relative leading-[20px]">
                (English(United Kingdom))
              </div>
            </div>
          </div>
        </div>
        <footer className="self-stretch bg-white flex flex-row items-center justify-between p-2.5 gap-5 z-[2] text-left text-sm text-dimgray font-roboto">
          <div className="flex flex-col items-center justify-start">
            <div className="flex flex-row items-start justify-start py-0 px-[11px]">
              <img
                className="h-6 w-6 relative"
                loading="lazy"
                alt=""
                src="/group-1.svg"
              />
            </div>
            <div className="flex flex-row items-start justify-start">
              <a className="[text-decoration:none] relative tracking-[0.25px] leading-[20px] text-[inherit] inline-block min-w-[46px]">
                Games
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="w-[33px] flex flex-row items-start justify-start py-0 px-1 box-border">
              <img
                className="h-6 w-6 relative"
                loading="lazy"
                alt=""
                src="/group-2.svg"
              />
            </div>
            <div className="flex flex-row items-start justify-start">
              <div className="relative tracking-[0.25px] leading-[20px] inline-block min-w-[33px]">
                Apps
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="w-[47px] flex flex-row items-start justify-start py-0 px-[11px] box-border">
              <img
                className="h-6 w-6 relative"
                loading="lazy"
                alt=""
                src="/group-3.svg"
              />
            </div>
            <div className="relative tracking-[0.25px] leading-[20px] inline-block min-w-[47px]">
              Movies
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="w-[41px] flex flex-row items-start justify-start py-0 px-2 box-border">
              <img
                className="h-6 w-6 relative"
                loading="lazy"
                alt=""
                src="/group-4.svg"
              />
            </div>
            <div className="relative tracking-[0.25px] leading-[20px] inline-block min-w-[41px]">
              Books
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="flex flex-row items-center justify-start py-0 px-[15px]">
              <img className="h-6 w-6 relative" alt="" src="/group-5.svg" />
            </div>
            <div className="relative tracking-[0.25px] leading-[20px] inline-block min-w-[54px]">
              Children
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
