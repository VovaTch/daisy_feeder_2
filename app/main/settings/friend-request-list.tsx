"use client";

import FriendRequestCard from "@/components/custom/friend-request-card";
import { useDaisyFeederContext } from "@/providers/context";
import { MessageCircleQuestion } from "lucide-react";

const SettingsFriendRequestList = () => {
  const { optimisticFriendRequests } = useDaisyFeederContext();
  return (
    <>
      <div className="bg-orange-500/50 w-4/5 flex flex-row items-center justify-center text-2xl text-white rounded-t-sm">
        <MessageCircleQuestion />
        <h1>Friend Requests</h1>
      </div>
      <div className="bg-white h-4/5 w-4/5 rounded-b-sm overflow-y-auto">
        {optimisticFriendRequests.map((userRequestData, idx) => (
          <FriendRequestCard
            key={idx}
            requestingUserProfile={userRequestData}
          />
        ))}
      </div>
    </>
  );
};

export default SettingsFriendRequestList;
