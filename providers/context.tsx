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

/**
 * DaisyFeederContextProvider component provides context for managing optimistic updates
 * for feeding items, friends, non-friends, and friend requests.
 *
 * @param {Object} props - The props for the DaisyFeederContextProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @param {Array} props.feedingItems - The initial list of feeding items.
 * @param {Array} props.friends - The initial list of friends.
 * @param {Array} props.nonFriends - The initial list of non-friends.
 * @param {Array} props.friendRequests - The initial list of friend requests.
 *
 * @returns {JSX.Element} The DaisyFeederContext.Provider component with the provided context values.
 */
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

/**
 * Custom hook to access the DaisyFeederContext.
 *
 * This hook provides the context value for the DaisyFeederContext.
 * It must be used within a ContextProvider that provides the DaisyFeederContext.
 *
 * @throws {Error} If the hook is used outside of a ContextProvider.
 *
 * @returns {DaisyFeederContextType} The context value for the DaisyFeederContext.
 */
export const useDaisyFeederContext = () => {
  const context = useContext(DaisyFeederContext);
  if (context === undefined) {
    throw new Error(
      "useDaisyFeederContext must be used within a ContextProvider"
    );
  }
  return context;
};
