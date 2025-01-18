import { Handshake, MessageCircleQuestion } from "lucide-react";

const SettingsPage = () => {
  return (
    <div
      className="absolute w-full lg:h-[calc(100vh-80px)] h-[calc(100vh-130px)] 
      flex lg:flex-row flex-col content-start lg:flex-wrap top-20 left-0 overflow-y-auto justify-start items-start py-0"
    >
      <div className="bg-red-500/50 lg:w-1/2 lg:h-3/4 w-[100vw] h-2/5 flex flex-col justify-center items-center">
        <div className="bg-orange-500/50 w-4/5 flex flex-row items-center justify-center text-2xl text-white">
          <Handshake />
          <h1>Friends</h1>
        </div>
        <div className="bg-white h-4/5 w-4/5"></div>
      </div>
      <div className="bg-blue-500/50 lg:w-1/2 lg:h-3/4 w-[100vw] h-2/5 flex flex-col justify-center items-center">
        <div className="bg-orange-500/50 w-4/5 flex flex-row items-center justify-center text-2xl text-white">
          <MessageCircleQuestion />
          <h1>Friend Requests</h1>
        </div>
        <div className="bg-white h-4/5 w-4/5"></div>
      </div>
      <div className="bg-green-500/50 w-full lg:h-1/4 h-1/5">
        <h1>sec3</h1>
      </div>
    </div>
  );
};

export default SettingsPage;
