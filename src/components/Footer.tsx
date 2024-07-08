const Footer = ({
  chatState,
  setChatState,
}: {
  chatState: any;
  setChatState: any;
}) => {
  return (
    <div className="lg:hidden h-[8%] w-[75%] mx-auto   ">
      <div className=" h-[32px] w-full bg-white rounded-[4px] flex justify-between items-center p-[2px] pl-[2px] pr-[2px]">
        <div
        onClick={()=>setChatState("DEN")}
          className={` uppercase text-[14px]  h-[30px] w-[50px] flex items-center justify-center rounded-[2px]  ${
            chatState === "DEN"
              ? "bg-[#0000FF] text-white"
              : "bg-none text-[#3d3d3d]"
          }`}
          //   style={{
          //     color: "#3D3D3D",
          //   }}
        >
          den
        </div>
        <div
        onClick={()=>setChatState("PUMP")}
          className={` uppercase text-[14px] ml-[25px] h-[30px] w-[50px] flex items-center justify-center rounded-[2px]  ${
            chatState === "PUMP"
              ? "bg-[#0000FF] text-white"
              : "bg-none text-[#3d3d3d]"
          }`}
          //   style={{
          //     color: "#3D3D3D",
          //   }}
        >
          PUMP
        </div>
        <div
        onClick={()=>setChatState("ALPHA")}
          className={` uppercase text-[14px] ml-[25px] h-[30px] w-[50px] flex items-center justify-center rounded-[2px]  ${
            chatState === "ALPHA"
              ? "bg-[#0000FF] text-white"
              : "bg-none text-[#3d3d3d]"
          }`}
          //   style={{
          //     color: "#3D3D3D",
          //   }}
        >
          alpha
        </div>
      </div>
    </div>
  );
};

export default Footer;
