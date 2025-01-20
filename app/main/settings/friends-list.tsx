"use client";

import FriendCard from "@/components/custom/friend-card";
import { useDaisyFeederContext } from "@/providers/context";
import { useAuth } from "@clerk/nextjs";
import { Handshake } from "lucide-react";

const SettingsFriendsList = () => {
  const { userId } = useAuth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const { optimisticFriends } = useDaisyFeederContext();

  return (
    <>
      <div className="bg-orange-500/50 w-4/5 flex flex-row items-center justify-center text-2xl text-white rounded-t-sm">
        <Handshake />
        <h1>Friends</h1>
      </div>
      <div className="bg-white h-4/5 w-4/5 rounded-b-sm overflow-y-auto">
        {optimisticFriends.map((friend, idx) => (
          <FriendCard key={idx} friendProfile={friend} currentUserId={userId} />
        ))}
      </div>
    </>
  );
};

export default SettingsFriendsList;
