"use client";

import { useAuth } from "@clerk/nextjs";
import { Handshake } from "lucide-react";

import FriendCard from "@/components/custom/friend-card";
import { useDaisyFeederContext } from "@/providers/context";

/**
 * `SettingsFriendsList` is a React functional component that displays a list of friends for the authenticated user.
 *
 * This component uses the `useAuth` hook to retrieve the current user's ID and the `useDaisyFeederContext`
 * hook to get the list of friends.
 * If the user is not authenticated (i.e., `userId` is not available), it throws an "Unauthorized" error.
 *
 * The component renders a header with a "Friends" title and a list of `FriendCard` components, each representing a friend.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @throws {Error} If the user is not authenticated.
 */
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
