import SendFriendRequestCard from "@/components/dialogs/send-friend-request";
import SettingsFriendsList from "./friends-list";
import SettingsFriendRequestList from "./friend-request-list";

const SettingsPage = async () => {
  return (
    <div
      className="absolute w-full lg:h-[calc(100vh-80px)] h-[calc(100vh-130px)] 
      flex lg:flex-row flex-col content-start lg:flex-wrap top-20 left-0 overflow-y-auto justify-start items-start py-0"
    >
      <div className="lg:w-1/2 lg:h-3/4 w-[100vw] h-2/5 flex flex-col justify-center items-center">
        <SettingsFriendsList />
      </div>
      <div className="lg:w-1/2 lg:h-3/4 w-[100vw] h-2/5 flex flex-col justify-center items-center">
        <SettingsFriendRequestList />
      </div>
      <div
        className="w-full lg:h-1/4 h-1/5 flex flex-col justify-start items-center border-t-4 border-l-2 border-r-2 border-white
      rounded-lg bg-gradient-to-b from-white/50 to-transparent"
      >
        <SendFriendRequestCard />
      </div>
    </div>
  );
};

export default SettingsPage;
