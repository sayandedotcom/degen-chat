import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { AiOutlineSend } from "react-icons/ai";
import settingsIcon from "./assets/settings.svg";
import settingsCloseIcon from "./assets/settingsClose.svg";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

interface Message {
  message: string;
}
interface Settings {
  visual: string;
  audio: string;
  motion: string;
}

const Chat = () => {
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message>();
  const [settingsModal, setSettingsModal] = useState<Settings>({
    visual: "rem",
    audio: "win",
    motion: "chaos",
  });

  useEffect(() => {
    const handleNewMessage = (msg: Message) => {
      setMessages(msg);
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("initialMessages");
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (currentUserMessage.trim()) {
      socket.emit("sendMessage", currentUserMessage);
      setCurrentUserMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-screen bg-[#0000FF] relative font-jbm uppercase max-h-screen overflow-hidden">
      <div className="h-[10%]">
        <div className="w-[90%] flex justify-end">
          <Navbar />
        </div>
      </div>
      {/* -------------------------------------- */}
      <div className="relative h-[75%] overflow-y-auto">
        <div className="">display chats here</div>
        {/* <p>{messages}</p> */}
      </div>
      {/* -------------------------------------- */}
      <div className="flex items-start lg:items-center justify-center gap-2 lg:gap-4 h-[15%] w-full">
        {isSettingsOpen ? (
          <div className="w-[70%] lg:w-[30%] relative top-[-100px]">
            <div className=" bg-white p-5 rounded-[8px] flex flex-col gap-[5px] ">
              <div className=" flex items-center rounded-[8px] ">
                <div className=" w-[15%] ">
                  <p className=" text-[10px] lg:text-[16px]">visual</p>
                </div>
                <div className="  w-full flex justify-around">
                  <div
                    className=" flex flex-col items-center "
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, visual: "rem" })
                    }
                  >
                    <div className="hidden lg:block bg-[#0000FF] text-white p-[5px] lg:p-2 rounded-[3px] text-[5px] lg:text-[10px] cursor-pointer ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p
                      className={`text-[10px] lg:text-[16px] ${
                        settingsModal.visual === "rem"
                          ? "text-[#0000FF]"
                          : "text-black"
                      } border border-black rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                    >
                      rem
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, visual: "neo" })
                    }
                  >
                    <div className="hidden lg:block bg-[#000000] text-[#00FF00] text-[5px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p
                      className={`text-[10px] lg:text-[16px] ${
                        settingsModal.visual === "neo"
                          ? "text-[#0000FF]"
                          : "text-black"
                      }  border border-black rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                    >
                      neo
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, visual: "oen" })
                    }
                  >
                    <div className="hidden lg:block bg-[#00FF00] text-[#000000] text-[5px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p
                      className={`text-[10px] lg:text-[16px] ${
                        settingsModal.visual === "oen"
                          ? "text-[#0000FF]"
                          : "text-black"
                      }  border border-black rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                    >
                      oen
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, visual: "hmmm" })
                    }
                  >
                    <div className="hidden lg:block bg-[#FF5959] text-[#3D3D3D] text-[5px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p
                      className={`text-[10px] lg:text-[16px] ${
                        settingsModal.visual === "hmmm"
                          ? "text-[#0000FF]"
                          : "text-black"
                      } border border-black rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                    >
                      hmmm
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, visual: "b/w" })
                    }
                  >
                    <div className="hidden lg:block bg-[#ffffff] text-[#000000] text-[5px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] border border-black cursor-pointer ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p
                      className={`text-[10px] lg:text-[16px] ${
                        settingsModal.visual === "b/w"
                          ? "text-[#0000FF]"
                          : "text-black"
                      }  border border-black rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                    >
                      b/w
                    </p>
                  </div>
                </div>
              </div>
              {/* --------------------------------------------- */}
              <div className=" flex items-center  rounded-[8px]">
                <p className=" w-[16%] text-[10px] lg:text-[16px]">audio</p>
                <div className=" w-full flex justify-around">
                  <div
                    className=" flex flex-col items-center justify-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, audio: "win" })
                    }
                  >
                    <div className="hidden lg:block  bg-[#ffffff] text-white text-[10px] p-2 border border-black h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer"></div>
                    <p
                      className={`text-[10px] lg:text-[16px] ${
                        settingsModal.audio === "win"
                          ? "text-[#0000FF]"
                          : "text-black"
                      } border border-black p-[4px] rounded-[2px] lg:border-none`}
                    >
                      win
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center "
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, audio: "slide" })
                    }
                  >
                    <div className=" hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border border-black h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer"></div>

                    <p
                      className={` text-[10px] lg:text-[16px] border ${
                        settingsModal.audio === "slide"
                          ? "text-[#0000FF]"
                          : "text-black"
                      } border-black p-[4px] rounded-[2px] lg:border-none`}
                    >
                      slide
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, audio: "on" })
                    }
                  >
                    <div className="hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border border-black h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer"></div>

                    <p
                      className={` text-[10px] lg:text-[16px] border ${
                        settingsModal.audio === "on"
                          ? "text-[#0000FF]"
                          : "text-black"
                      } border-black p-[4px] rounded-[2px] lg:border-none`}
                    >
                      on
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, audio: "synth" })
                    }
                  >
                    <div className="hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border border-black h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer"></div>

                    <p
                      className={` text-[10px] lg:text-[16px] ${
                        settingsModal.audio === "synth"
                          ? "text-[#0000FF]"
                          : "text-black"
                      } border border-black p-[4px] rounded-[2px] lg:border-none`}
                    >
                      synth
                    </p>
                  </div>

                  <div
                    className=" flex flex-col items-center"
                    onClick={() =>
                      setSettingsModal({ ...settingsModal, audio: "ambient" })
                    }
                  >
                    <div className="hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border border-black h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer"></div>

                    <p
                      className={` text-[10px] lg:text-[16px] ${
                        settingsModal.audio === "ambient"
                          ? "text-[#0000FF]"
                          : "text-black"
                      } border border-black p-[4px] rounded-[2px] lg:border-none`}
                    >
                      ambient
                    </p>
                  </div>
                </div>
              </div>
              {/* ------------------------------- */}
              <div className=" flex items-center  rounded-[8px]">
                <p className=" w-[18%] text-[10px] lg:text-[16px]">motion</p>
                <div className=" flex w-full justify-around">
                  <div className=" flex flex-col items-center">
                    <div className="hidden lg:block bg-[#white] text-black border border-black  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                      chaos
                    </p>
                  </div>
                  <div className=" flex flex-col items-center">
                    <div className="hidden lg:block bg-[#white] text-black border border-black  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                      focused
                    </p>
                  </div>
                  <div className=" flex flex-col items-center">
                    <div className="hidden lg:block bg-[#white] text-black border border-black  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                      equator
                    </p>
                  </div>
                  <div className=" flex flex-col items-center">
                    <div className="hidden lg:block bg-[#white] text-black border border-black  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] ">
                      <p>dont sin</p>
                      <p>dont sin</p>
                      <p>dont sin</p>
                    </div>
                    <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                      b/w
                    </p>
                  </div>
                  <button className=" lg:block lg:h-[70px] lg:w-[70px] uppercase flex items-center justify-center  text-[10px] lg:text-[16px] ">
                    save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[70%] lg:w-[30%]">
            <input
              placeholder="this is settings modal"
              value={currentUserMessage}
              className="bg-white text-[#121212] uppercase p-3 lg:p-5 mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none"
              onChange={(e) => setCurrentUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        <button
          className="p-[10px] lg:p-[15px] bg-white rounded-[4px] lg:rounded-[8px]"
          onClick={handleSendMessage}
        >
          <AiOutlineSend className="w-[28px] lg:w-[35px] h-auto text-[#0000FF]" />
        </button>
        <button
          className="p-[10px] lg:p-[15px] bg-white rounded-[4px] lg:rounded-[8px]"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <img
            src={isSettingsOpen ? settingsCloseIcon : settingsIcon}
            className="w-[28px] lg:w-[35px] h-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
