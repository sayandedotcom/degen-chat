import { useRecoilValue, useSetRecoilState } from "recoil";
import { websiteThemeState } from "../atoms/website-theme";
import Navbar from "./Navbar";
import defaultProfilePic from "../assets/bottle.png";
import { useState } from "react";
import errorIcon from "../assets/error.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { userNameState } from "../atoms/users";
const Profile = () => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  const setusername = useSetRecoilState(userNameState);
  const [userName, setUserName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const walletAddress = localStorage.getItem("walletAddress");

  const validateUsername = async () => {
    try {
      setShowError(false);
      const result = await axios.post(
        `http://localhost:3000/api/profile?walletAddress=${walletAddress}&username=${userName}`
      );
      setUserName("");
      if (result.status === 201) {
        setShowSuccess(true);
        setusername(result.data.user.username);
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 409) {
          setShowError(true);
        }
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: websiteTheme.bgColor,
        color: websiteTheme.textColor,
      }}
      className="uppercase h-screen max-h-screen w-full font-jbm"
    >
      <div className="h-[10%] ">
        <div className="w-[90%] flex justify-end">
          <Navbar websiteTheme />
        </div>
      </div>

      <div className="   h-[90%] flex flex-col items-center justify-center relative top-[-100px] gap-5 lg:gap-10 w-full ">
        <div className="  border border-white h-[100px] w-[100px] lg:h-[200px] lg:w-[200px] rounded-[100%] flex items-center justify-center ">
          <img
            src={defaultProfilePic}
            className=" w-[50px] lg:w-[100px] h-auto "
          />
        </div>
        <div className=" flex items-center gap-2 ">
          <div className=" border border-white p-2 lg:p-5 text-[15px] lg:text-[20px]">
            username
          </div>
          <div>
            <input
              placeholder="type here"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="  bg-inherit uppercase  border border-white p-2 lg:p-5 text-[15px] lg:text-[20px] outline-none text-red-600"
            />
          </div>
        </div>
        {showError && (
          <div className=" flex gap-2 items-center justify-center ">
            <img src={errorIcon} />
            <p>name taken try something else</p>
          </div>
        )}
        {showSuccess && (
          <div className=" flex gap-2 items-center justify-center ">
            {/* <img src={errorIcon} /> */}
            <p>username added successfully</p>
          </div>
        )}
        <button
          onClick={validateUsername}
          className={` border border-white p-2 lg:p-5 uppercase bg-white text-[#0000ff] w-[320px] lg:w-[450px] text-[15px] lg:text-[20px] ${
            userName.length === 0 ? "opacity-80" : "opacity-100"
          }`}
        >
          save
        </button>
        <Link to="/chat">
          <p className=" uppercase text-[15px] lg:text-[20px]">Back to chat</p>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
