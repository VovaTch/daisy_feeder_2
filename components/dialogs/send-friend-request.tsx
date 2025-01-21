"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

import { UserProfile } from "../types/users";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { createFriendRequest } from "@/actions/friend-requests";
import { useDaisyFeederContext } from "@/providers/context";

/**
 * `SendFriendRequestCard` is a React functional component that renders a button to open a dialog
 * for sending friend requests. It utilizes the `useAuth` hook to get the current user's ID and
 * the `useDaisyFeederContext` to get a list of users who are not yet friends.
 *
 * When the button is clicked, a dialog opens allowing the user to search for other users and send
 * friend requests. The dialog contains a search input and a list of users with an option to send
 * a friend request to each user.
 *
 * @component
 * @example
 * return (
 *   <SendFriendRequestCard />
 * )
 *
 * @throws {Error} If the user is not authenticated.
 *
 * @returns {JSX.Element} The rendered component.
 */
const SendFriendRequestCard = () => {
  const { userId: currentUserId } = useAuth();
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
  const { optimisticNonFriends } = useDaisyFeederContext();
  const [open, setOpen] = useState<boolean>(false);

  const handleSendFriendRequest = async (user: UserProfile) => {
    try {
      await createFriendRequest(currentUserId, user.id);
      toast("Friend request sent!", {
        description: `Friend request sent to ${user.username}`,
      });
    } catch (error) {
      console.error(error);
      toast(
        `Something went wrong, failed to send friend request to ${user.username}`
      );
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setOpen(true)}
        size="lg"
        className="lg:mt-10 mt-3 lg:w-3/5 w-4/5 lg:text-2xl"
      >
        Search for friends...
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send a friend request</DialogTitle>
            <DialogDescription>Search for friends...</DialogDescription>
          </DialogHeader>
          <Command className="flex flex-col items-center justify-center">
            <div className="border-2 border-orange-100 w-full overflow-y-auto max-h-[800px] rounded-lg">
              <CommandInput placeholder={"Search for user..."} />
              <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                {optimisticNonFriends.map((user, idx) => (
                  <CommandItem key={idx}>
                    <span className="text-orange-500 text-lg m-2 flex flex-row items-center justify-start relative w-full">
                      <Image
                        src={user.avatarUrl}
                        alt={user.username}
                        height={30}
                        width={30}
                        className="rounded-full mr-5"
                      />
                      {user.username}
                      <Button
                        variant="primaryOutline"
                        className="right-1 absolute bg-transparent hover:bg-orange-500 hover:text-white active:bg-amber-300 
                        transition-colors"
                        onClick={() => handleSendFriendRequest(user)}
                      >
                        Send Request
                      </Button>
                    </span>
                  </CommandItem>
                ))}
              </CommandList>
            </div>
            <Button
              variant="primary"
              className="w-4/5 m-3"
              onClick={() => setOpen(false)}
            >
              Back
            </Button>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SendFriendRequestCard;
