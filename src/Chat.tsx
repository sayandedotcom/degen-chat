import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { AiOutlineSend } from "react-icons/ai";
import io from "socket.io-client";
import { handleSettingsSave } from "./utils/handleSettings";
import SettingsIcon from "./components/SettingsIcon";
import SettingsClosed from "./components/SettingsClosed";
const socket = io("http://localhost:3000");
import { motion, AnimatePresence } from "framer-motion";
import { MessageComponent } from "../src/components/Message";
import { useRecoilState } from "recoil";
import { websiteThemeState } from "./atoms/website-theme";
import axios from "axios";
import messageNotification from "./assets/message_notification.mp3"

interface Message {
  _id: any;
  message: string;
  username: string;
}
interface Settings {
  visual: string;
  audio: string;
  motion: string;
}

interface WebsiteTheme {
  bgColor: string;
  textColor: string;
  buttonColor: string;
}

const Chat = () => {
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsModal, setSettingsModal] = useState<Settings>({
    visual: "rem",
    audio: "win",
    motion: "chaos",
  });
  const [websiteTheme, setWebsiteTheme] = useRecoilState(websiteThemeState);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message[]>([]);

  useEffect(() => {
    const loadInitialMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/initialMessages"
        );
        const messages = response.data;
        if (messages) {
          setInitialMessages(messages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadInitialMessages();

    const handleNewMessage = (msg: Message) => {
      setNewMessage((prevMessages: Message[]) => {
        return [...prevMessages, msg];
      });
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("initialMessages");
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (currentUserMessage.trim()) {
      socket.emit("sendMessage", {
        username: "random",
        message: currentUserMessage,
      });
      setCurrentUserMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSave = () => {
    setIsSettingsOpen(false);
    handleSettingsSave(settingsModal, websiteTheme, setWebsiteTheme);
  };

  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  return (
    <div
      style={{
        backgroundColor: websiteTheme.bgColor,
        color: websiteTheme.textColor,
      }}
      className={`w-full h-screen  relative font-jbm uppercase max-h-screen overflow-hidden`}
    >
      <div className="h-[10%]">
        <div className="w-[90%] flex justify-end">
          <Navbar websiteTheme />
        </div>
      </div>
      {/* -------------------------------------- */}
      <div className="relative h-[75%] overflow-y-auto">
        <div className="">
          {initialMessages.map((msg: Message) => (
            <div className="flex gap-2">
              <p>{msg.username}</p>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {newMessage.map((msg, index) => (
            <MessageComponent
              message={msg.message}
              username={msg.username}
              key={msg._id}
            />
          ))}
        </AnimatePresence>
      </div>
      {/* -------------------------------------- */}
      <div className="flex items-start lg:items-center justify-center gap-2 lg:gap-4 h-[15%] w-full">
        <AnimatePresence>
          {isSettingsOpen ? (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-[70%] lg:w-[40%] xl:w-[35%] relative top-[-50px] lg:top-[-100px] text-black"
            >
              <div
                className={`${
                  websiteTheme.bgColor === "#ffffff"
                    ? "border border-black"
                    : "border-none"
                } bg-white  p-5 rounded-[8px] flex flex-col gap-[5px] `}
              >
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
                      <div
                        className={`hidden lg:block  bg-[#ffffff] text-white text-[10px] p-2 border ${
                          settingsModal.audio === "win"
                            ? "border-[#0000FF]"
                            : "border-black"
                        }  h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer`}
                      ></div>
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
                      <div
                        className={` hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border ${
                          settingsModal.audio === "slide"
                            ? "border-[#0000FF]"
                            : "border-black"
                        } h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer`}
                      ></div>

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
                      <div
                        className={`hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border ${
                          settingsModal.audio === "on"
                            ? "border-[#0000FF]"
                            : "border-black"
                        } h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer`}
                      ></div>

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
                      <div
                        className={`hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border ${
                          settingsModal.audio === "synth"
                            ? "border-[#0000FF]"
                            : "border-black"
                        } h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer`}
                      ></div>

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
                      <div
                        className={`hidden lg:block bg-[#ffffff] text-white text-[10px] p-2 border ${
                          settingsModal.audio === "ambient"
                            ? "border-[#0000FF]"
                            : "border-black"
                        } h-[32px] w-[35px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer`}
                      ></div>

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
                    <div
                      className=" flex flex-col items-center"
                      onClick={() =>
                        setSettingsModal({ ...settingsModal, motion: "chaos" })
                      }
                    >
                      <div
                        className={`hidden lg:block bg-[#white] ${
                          settingsModal.motion === "chaos"
                            ? "text-[#0000FF] border border-[#0000FF]"
                            : "text-black border border-black"
                        }  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] cursor-pointer`}
                      >
                        <p>dont sin</p>
                        <p>dont sin</p>
                        <p>dont sin</p>
                      </div>
                      <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                        chaos
                      </p>
                    </div>
                    <div
                      className=" flex flex-col items-center"
                      onClick={() =>
                        setSettingsModal({
                          ...settingsModal,
                          motion: "focused",
                        })
                      }
                    >
                      <div
                        className={`hidden lg:block bg-[#white] ${
                          settingsModal.motion === "focused"
                            ? "text-[#0000FF] border border-[#0000FF]"
                            : "text-black border border-black"
                        }  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] cursor-pointer `}
                      >
                        <p>dont sin</p>
                        <p>dont sin</p>
                        <p>dont sin</p>
                      </div>
                      <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                        focused
                      </p>
                    </div>
                    <div
                      className=" flex flex-col items-center"
                      onClick={() =>
                        setSettingsModal({
                          ...settingsModal,
                          motion: "equator",
                        })
                      }
                    >
                      <div
                        className={`hidden lg:block bg-[#white] ${
                          settingsModal.motion === "equator"
                            ? "text-[#0000FF] border border-[#0000FF]"
                            : "text-black border border-black"
                        } lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] cursor-pointer`}
                      >
                        <p>dont sin</p>
                        <p>dont sin</p>
                        <p>dont sin</p>
                      </div>
                      <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                        equator
                      </p>
                    </div>
                    <div
                      className=" flex flex-col items-center"
                      onClick={() =>
                        setSettingsModal({ ...settingsModal, motion: "b/w" })
                      }
                    >
                      <div
                        className={`hidden lg:block bg-[#white] ${
                          settingsModal.motion === "b/w"
                            ? "text-[#0000FF] border border-[#0000FF]"
                            : "text-black border border-black"
                        }  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[5px] cursor-pointer`}
                      >
                        <p>dont sin</p>
                        <p>dont sin</p>
                        <p>dont sin</p>
                      </div>
                      <p className=" text-[10px] lg:text-[16px] border border-black p-[4px] rounded-[2px] lg:border-none">
                        b/w
                      </p>
                    </div>
                    <button
                      className=" lg:block lg:h-[70px] lg:w-[70px] uppercase flex items-center justify-center  text-[10px] lg:text-[16px] "
                      onClick={handleSave}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-[70%] lg:w-[40%] xl:w-[35%] ">
              <motion.input
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                placeholder="type something retarded..."
                value={currentUserMessage}
                className={`bg-white ${
                  websiteTheme.bgColor === "#ffffff"
                    ? "border border-black"
                    : "border-none"
                } text-[#121212] uppercase p-3 lg:p-5 mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none`}
                onChange={(e) => setCurrentUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </AnimatePresence>
        <motion.button
          whileTap={clickAnimation}
          className={`p-[10px] lg:p-[15px] ${
            websiteTheme.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
          } bg-white rounded-[4px] lg:rounded-[8px]`}
          onClick={handleSendMessage}
        >
          <AiOutlineSend
            className={`w-[28px] lg:w-[35px] h-auto `}
            style={{
              color: websiteTheme.buttonColor,
            }}
          />
        </motion.button>
        <motion.button
          whileTap={clickAnimation}
          className={`p-[10px] lg:p-[15px] ${
            websiteTheme.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
          } bg-white rounded-[4px] lg:rounded-[8px]`}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          {isSettingsOpen ? (
            <SettingsClosed color={websiteTheme.buttonColor} />
          ) : (
            <SettingsIcon color={websiteTheme.buttonColor} />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Chat;
