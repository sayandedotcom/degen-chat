// import { Wallet } from "./components/wallet-adapter";

import bgVideo from "./assets/bg.mp4";
import bottle from "./assets/bottle.png";
import { useRef } from "react";
import winMusic from "./assets/win.mp3"
// import Finished from "./components/wallet-adapter";
function App() {
  const audioRef = useRef(null);
  return (
    <div className="relative w-full h-screen ">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-top opacity-80"
        src={bgVideo}
        autoPlay
        loop
        muted
      />
      <div>
        <audio ref={audioRef} loop autoPlay>
          <source src={winMusic} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full top-[-100px] lg:top-[-50px]">
        <div className="text-white text-center flex flex-col justify-between">
          <img src={bottle} className=" mx-auto w-[100px] h-auto" />
          <h1 className=" text-[40px] lg:text-[80px] font-bold  font-jbm uppercase">
            degen chat
          </h1>
          <p className="text-[15px] lg:text-[24px] uppercase font-jbm ">
            autism friendly chat interface from the future
          </p>
          <div className=" bg-white coming-soon-shadow text-[#0000FF] uppercase font-jbm text-[15px] lg:text-[24px] p-2 lg:p-4 w-[90%] mx-auto mt-5 sm:w-full ">
            cumming to you soon
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-0"></div>
    </div>
  );
}

export default App;
