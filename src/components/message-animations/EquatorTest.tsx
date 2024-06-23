import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { websiteThemeState } from "../../atoms/website-theme";
import { useRecoilValue } from "recoil";

interface Message {
  _id: any;
  message: string;
  username: string;
  profilePic: string;
}
interface InitialMessage {
  _id: any;
  message: string;
  username: string;
  profilePic: string;
}

const Slider = ({
  messages,
  scrollDirection,
}: {
  messages: Message[];
  scrollDirection: "left" | "right";
}) => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  return (
    <Marquee
      className=""
      speed={40}
      delay={0}
      autoFill
      direction={scrollDirection}
      key={messages.map((msg) => msg._id).join()}
    >
      <div className="flex gap-[30px] w-full">
        {messages.map((msg: Message) => (
          <>
            <div className=" flex items-center gap-[10px] ">
              <p
                className=" text-[12px] lg:text-[14px] xl:text-[16px] "
                style={{
                  color: websiteTheme.textColor,
                }}
              >
                {msg.username}
              </p>
              <div className=" rounded-full lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] overflow-hidden">
                <img
                  src={msg.profilePic}
                  className=" object-cover w-full h-full"
                />
              </div>
              <p className="  text-[13px] lg:text-[18px] xl:text-[20px] max-w-[550px]  my-auto">
                {msg.message}
              </p>
            </div>
            <div
              className="w-[1px] lg:w-[1px] mx-auto h-[50px] lg:h-[70px]"
              style={{
                backgroundImage: `linear-gradient(to bottom , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )`,
              }}
            />
          </>
        ))}
        {messages.map((msg: Message) => (
          <>
            <div className=" flex items-center gap-[10px]  ">
              <p
                className=" text-[12px] lg:text-[14px] xl:text-[16px] "
                style={{
                  color: websiteTheme.textColor,
                }}
              >
                {msg.username}
              </p>
              <div className=" rounded-full lg:h-[50px] lg:w-[50px] w-[35px] h-[35px] overflow-hidden">
                <img
                  src={msg.profilePic}
                  className=" object-cover w-full h-full"
                />
              </div>
              <p className="  text-[13px] lg:text-[18px] xl:text-[20px] max-w-[500px]  ">
                {msg.message}
              </p>
            </div>
            <div
              className="w-[1px] lg:w-[1px] mx-auto h-[50px] lg:h-[90px] "
              style={{
                backgroundImage: `linear-gradient(to bottom , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )`,
              }}
            />
          </>
        ))}
      </div>
    </Marquee>
  );
};

const Equator = ({
  initialMessages,
  newMessage,
}: {
  initialMessages: InitialMessage[];
  newMessage: Message[];
}) => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  const [firstRowMessages, setFirstRowMessages] = useState<
    Message[] | undefined
  >([]);
  const [secondRowMessages, setSecondRowMessages] = useState<
    Message[] | undefined
  >([]);
  const [thirdRowMessages, setThirdRowMessages] = useState<
    Message[] | undefined
  >([]);
  const [fourthRowMessages, setFourthRowMessages] = useState<
    Message[] | undefined
  >([]);

  useEffect(() => {
    setFourthRowMessages((previousMessages) => [...previousMessages, newMessage?.[newMessage.length - 1]]);
  }, [newMessage]);
  

  useEffect(() => {
    setFirstRowMessages(initialMessages.slice(0, 16));
    setSecondRowMessages(initialMessages.slice(16, 32));
    setThirdRowMessages(initialMessages.slice(32, 48));
    setFourthRowMessages(initialMessages.slice(48, initialMessages.length));
  }, [initialMessages]);

  return (
    <div className="w-full flex flex-col justify-end h-full gap-[40px] ">
      <Slider messages={firstRowMessages} scrollDirection="left" />
      <div
        className="w-[50%] h-[1px]"
        style={{
          backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )`,
        }}
      />
      <Slider messages={secondRowMessages} scrollDirection="right" />
      <div
        className="w-[50%] mx-auto h-[1px]"
        style={{
          backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )`,
        }}
      />
      <Slider messages={thirdRowMessages} scrollDirection="left" />
      <div className=" flex flex-col items-end">
        <div
          className="w-[50%] h-[1px]"
          style={{
            backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.textColor} , ${websiteTheme.bgColor} )`,
          }}
        />
      </div>
      <Slider messages={fourthRowMessages} scrollDirection="right" />
    </div>
  );
};

export default Equator;
