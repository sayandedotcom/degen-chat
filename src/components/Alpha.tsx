import { useRecoilValue } from "recoil";
import JeaIcon from "../assets/JeaIcon.svg";
import { websiteThemeState } from "../atoms/website-theme";
import { CopyTextIcon } from "./Icons";

const Alpha = () => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  return (
    <div className="h-[75%] w-full">
      <div
        style={{ color: websiteTheme.textColor }}
        className="flex w-[90%] mx-auto"
      >
        <div>
          <img src={JeaIcon} alt="Jea Icon" />
        </div>
        <div className="flex flex-col gap-[5px]  w-[90%] mx-auto">
          <p className="uppercase text-[14px]">Jeai</p>
          <p className="uppercase text-[16px] break-words">
            FV56CmR7fhEyPkymKfmviKV48uPo51ti9kAxssQqTDLu
            <span>
              <CopyTextIcon />
            </span>
          </p>
          <p className="italic text-[16px] text-center">
            “aped my life savings in Walter, this is FA”
          </p>

          <div
            className="h-[1px] w-[90%] mx-auto"
            style={{
              background: `linear-gradient(to right, ${websiteTheme.bgColor}, ${websiteTheme.textColor}, ${websiteTheme.bgColor})`,
            }}
          />
        </div>
      </div>
      <div
        style={{ color: websiteTheme.textColor }}
        className="flex flex-col gap-[10px]"
      >
        <p className="text-center text-[20px] uppercase">
          highest quality alpha from selected callers
        </p>
        <p className="text-center text-[20px] uppercase">v v soon</p>
      </div>
    </div>
  );
};

export default Alpha;
