"use client";

import { FeedingItem } from "@/components/types/food-item";
import { RequestingUserProfile, UserProfile } from "@/components/types/users";
import { createContext, useContext, useOptimistic } from "react";

// Context types and context

type ContextType = {
  optimisticFeedingItems: FeedingItem[];
  setOptimisticFeedingItems: (_action: {
    action: "add" | "remove" | "update";
    addedItem: FeedingItem;
  }) => void;
  optimisticFriends: UserProfile[];
  setOptimisticFriends: (_action: {
    action: "add" | "remove";
    addedItem: UserProfile;
  }) => void;
  optimisticNonFriends: UserProfile[];
  setOptimisticNonFriends: (_action: {
    action: "add" | "remove";
    addedItem: UserProfile;
  }) => void;
  optimisticFriendRequests: RequestingUserProfile[];
  setOptimisticFriendRequests: (_action: {
    action: "accept" | "reject";
    addedItem: RequestingUserProfile;
  }) => void;
};

export const DaisyFeederContext = createContext<ContextType | undefined>(
  undefined
);

// Provider props

type ProviderProps = {
  children: React.ReactNode;
  feedingItems: FeedingItem[];
  friends: UserProfile[];
  nonFriends: UserProfile[];
  friendRequests: RequestingUserProfile[];
};

// Optimistic update types

type OptimisticAddedItemProps = {
  action: "add" | "remove" | "update";
  addedItem: FeedingItem;
};

type OptimisticFriendProps = {
  action: "add" | "remove";
  addedItem: UserProfile;
};

type OptimisticNonFriendProps = {
  action: "add" | "remove";
  addedItem: UserProfile;
};

type OptimisticFriendRequestProps = {
  action: "accept" | "reject";
  addedItem: RequestingUserProfile;
};

const DaisyFeederContextProvider = ({
  children,
  feedingItems,
  friends,
  nonFriends,
  friendRequests,
}: ProviderProps) => {
  const [optimisticFeedingItems, setOptimisticFeedingItems] = useOptimistic(
    feedingItems,
    (state, { action, addedItem }: OptimisticAddedItemProps) => {
      switch (action) {
        case "add":
          return [...state, addedItem];
        case "remove":
          return state.filter((item) => item.id !== addedItem.id);
        case "update":
          return state.map((item) =>
            item.id === addedItem.id ? addedItem : item
          );
      }
    }
  );

  const [optimisticFriends, setOptimisticFriends] = useOptimistic(
    friends,
    (state, { action, addedItem }: OptimisticFriendProps) => {
      switch (action) {
        case "add":
          return [...state, addedItem];
        case "remove":
          return state.filter((item) => item.id !== addedItem.id);
      }
    }
  );

  const [optimisticNonFriends, setOptimisticNonFriends] = useOptimistic(
    nonFriends,
    (state, { action, addedItem }: OptimisticNonFriendProps) => {
      switch (action) {
        case "add":
          return [...state, addedItem];
        case "remove":
          return state.filter((item) => item.id !== addedItem.id);
      }
    }
  );

  const [optimisticFriendRequests, setOptimisticFriendRequests] = useOptimistic(
    friendRequests,
    (state, { action, addedItem }: OptimisticFriendRequestProps) => {
      switch (action) {
        case "accept":
          return state.filter((item) => item.requestId !== addedItem.requestId);
        case "reject":
          return state.filter((item) => item.requestId !== addedItem.requestId);
      }
    }
  );

  return (
    <DaisyFeederContext.Provider
      value={{
        optimisticFeedingItems,
        setOptimisticFeedingItems,
        optimisticFriends,
        setOptimisticFriends,
        optimisticNonFriends,
        setOptimisticNonFriends,
        optimisticFriendRequests,
        setOptimisticFriendRequests,
      }}
    >
      {children}
    </DaisyFeederContext.Provider>
  );
};

export default DaisyFeederContextProvider;

export const useDaisyFeederContext = () => {
  const context = useContext(DaisyFeederContext);
  if (context === undefined) {
    throw new Error(
      "useDaisyFeederContext must be used within a ContextProvider"
    );
  }
  return context;
};
