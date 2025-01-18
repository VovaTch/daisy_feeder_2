import FriendCard from "@/components/custom/friend-card";
import FriendRequestCard from "@/components/custom/friend-request-card";
import SendFriendRequestCard from "@/components/dialogs/send-friend-request";
import {
  getFriendUsers,
  getNoneFriendNonRequestUsers,
  getPendingFriendRequests,
} from "@/db/queries";
import { auth } from "@clerk/nextjs/server";
import { Handshake, MessageCircleQuestion } from "lucide-react";

const SettingsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const friendsPromise = getFriendUsers(userId);
  const nonFriendUsersPromise = getNoneFriendNonRequestUsers(userId);
  const friendRequestsPromise = getPendingFriendRequests(userId);

  const [friends, nonFriendUsers, friendRequests] = await Promise.all([
    friendsPromise,
    nonFriendUsersPromise,
    friendRequestsPromise,
  ]);

  return (
    <div
      className="absolute w-full lg:h-[calc(100vh-80px)] h-[calc(100vh-130px)] 
      flex lg:flex-row flex-col content-start lg:flex-wrap top-20 left-0 overflow-y-auto justify-start items-start py-0"
    >
      <div className="lg:w-1/2 lg:h-3/4 w-[100vw] h-2/5 flex flex-col justify-center items-center">
        <div className="bg-orange-500/50 w-4/5 flex flex-row items-center justify-center text-2xl text-white rounded-t-sm">
          <Handshake />
          <h1>Friends</h1>
        </div>
        <div className="bg-white h-4/5 w-4/5 rounded-b-sm overflow-y-auto">
          {friends.map((friend, idx) => (
            <FriendCard key={idx} friendProfile={friend} />
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 lg:h-3/4 w-[100vw] h-2/5 flex flex-col justify-center items-center">
        <div className="bg-orange-500/50 w-4/5 flex flex-row items-center justify-center text-2xl text-white rounded-t-sm">
          <MessageCircleQuestion />
          <h1>Friend Requests</h1>
        </div>
        <div className="bg-white h-4/5 w-4/5 rounded-b-sm overflow-y-auto">
          {friendRequests.map((userProfile, idx) => (
            <FriendRequestCard key={idx} requestingUserProfile={userProfile} />
          ))}
        </div>
      </div>
      <div
        className="w-full lg:h-1/4 h-1/5 flex flex-col justify-start items-center border-t-4 border-l-2 border-r-2 border-white
      rounded-lg bg-gradient-to-b from-white/50 to-transparent"
      >
        <SendFriendRequestCard nonFriendUsers={nonFriendUsers} />
      </div>
    </div>
  );
};

export default SettingsPage;
