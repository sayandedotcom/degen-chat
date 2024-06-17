import { useRecoilValue } from "recoil";
import { websiteThemeState } from "../atoms/website-theme";
import Navbar from "./Navbar";
const Profile = () => {
  const websiteTheme = useRecoilValue(websiteThemeState);

  return (
    <div
      style={{
        backgroundColor: websiteTheme.bgColor,
        color: websiteTheme.textColor,
      }}
      className="uppercase h-screen max-h-screen w-full font-jbm"
    >
      <div className="h-[10%]">
        <div className="w-[90%] flex justify-end">
          <Navbar websiteTheme />
        </div>
      </div>

      <div className="flex flex-col itece justify-center">
        <div></div>
        <div className=" flex">
          <div className=" border border-white p-5">username</div>
        </div>
        <div>
          <div >password</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
