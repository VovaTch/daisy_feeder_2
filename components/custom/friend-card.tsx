"use client";

import Image from "next/image";
import { startTransition, useState } from "react";
import { toast } from "sonner";

import { UserProfile } from "../types/users";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import { unfriendUser } from "@/actions/friend-requests";
import { useDaisyFeederContext } from "@/providers/context";

type FriendCardProps = {
  friendProfile: UserProfile;
  currentUserId: string;
};

const FriendCard = ({ friendProfile, currentUserId }: FriendCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { setOptimisticFriends } = useDaisyFeederContext();

  const handleRemoveDialog = async (status: "accept" | "reject") => {
    setOpen(false);
    startTransition(async () => {
      setOptimisticFriends({ action: "remove", addedItem: friendProfile });
      await unfriendUser(currentUserId, friendProfile.id);
    });

    if (status === "accept") {
      toast(`Removed ${friendProfile.username} from the friend list`);
      console.log("accept");
    }
  };

  return (
    <div className="bg-white rounded-lg border-b-2 border-slate-200 lg:m-4 lg:p-4 m-2 p-2 flex flex-row relative">
      <Image
        src={friendProfile.avatarUrl}
        alt={friendProfile.username}
        height={40}
        width={40}
        className="rounded-full lg:mr-5 mr-2"
      />
      <h2 className="lg:text-xl font-semibold text-center mt-2 tracking-wider text-orange-500">
        {friendProfile.username}
      </h2>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="danger"
            className="absolute right-5 w-1/4 lg:text-base text-sm"
          >
            remove
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Friend?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {friendProfile.username} from your
              friends list?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-row justify-evenly items-center w-full">
              <Button
                variant="primary"
                className="mr-2 w-full"
                onClick={() => handleRemoveDialog("accept")}
              >
                Remove
              </Button>
              <Button
                variant="danger"
                className="w-full"
                onClick={() => handleRemoveDialog("reject")}
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FriendCard;
