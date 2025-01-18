"use client";

import Image from "next/image";
import { RequestingUserProfile } from "../types/users";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

type FriendRequestCardProps = {
  requestingUserProfile: RequestingUserProfile;
};

const FriendRequestCard = ({
  requestingUserProfile,
}: FriendRequestCardProps) => {
  // TODO: implement friend request approving
  const handleAcceptFriendRequest = async () => {
    toast(
      `Accepted friend request from ${requestingUserProfile.fromUserUsername}`
    );
  };

  // TODO: implement friend request rejecting
  const handleRejectFriendRequest = async () => {
    toast(
      `Rejected friend request from ${requestingUserProfile.fromUserUsername}`
    );
  };

  return (
    <div className="bg-white rounded-lg border-b-2 border-slate-200 lg:m-4 lg:p-4 m-2 p-2 flex flex-row relative">
      <Image
        src={requestingUserProfile.fromUserAvatarUrl}
        alt={requestingUserProfile.fromUserUsername}
        height={40}
        width={40}
        className="rounded-full lg:mr-5 mr-2"
      />
      <h2 className="lg:text-xl font-semibold text-center mt-2 tracking-wider text-orange-500">
        {requestingUserProfile.fromUserUsername}
      </h2>
      <div className="hidden lg:flex flex-row absolute right-5 w-2/5">
        <Button
          variant="primary"
          className="mr-2 border-r-2"
          onClick={handleAcceptFriendRequest}
        >
          accept
        </Button>
        <Button
          variant="danger"
          className=""
          onClick={handleRejectFriendRequest}
        >
          reject
        </Button>
      </div>
      <div className="lg:hidden flex flex-row absolute right-1 w-3/10">
        <Button
          variant="primary"
          className="mr-2 border-r-2"
          onClick={handleAcceptFriendRequest}
        >
          <Check className="h-[40px] w-[40px]" />
        </Button>
        <Button
          variant="danger"
          className="border-r-2"
          onClick={handleRejectFriendRequest}
        >
          <X className="h-[40px] w-[40px]" />
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
