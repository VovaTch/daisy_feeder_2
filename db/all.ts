import { clearFriendRequests } from "@/actions/friend-requests";
import {
  getFeedingItems,
  getFriendUsers,
  getNoneFriendNonRequestUsers,
  getPendingFriendRequests,
} from "./queries";
import { syncUser } from "@/actions/users";

type Props = {
  userId: string;
};

/**
 * Retrieves application data for a given user.
 *
 * This function fetches various data related to the user, including feeding items,
 * friends, non-friends, and pending friend requests. It also clears friend requests
 * and synchronizes the user data.
 *
 * @param {Props} param0 - The properties object.
 * @param {string} param0.userId - The ID of the user for whom to retrieve the data.
 * @returns {Promise<{feedingData: any, friends: any, nonFriends: any, pendingRequests: any}>}
 *          A promise that resolves to an object containing the feeding data, friends,
 *          non-friends, and pending friend requests.
 */
export const getAppData = async ({ userId }: Props) => {
  const feedingDataPromise = getFeedingItems(userId);
  const friendsPromise = getFriendUsers(userId);
  const nonFriendsPromise = getNoneFriendNonRequestUsers(userId);
  const pendingRequestsPromise = getPendingFriendRequests(userId);
  const clearFriendRequestsPromise = clearFriendRequests();
  const syncUserPromise = syncUser();

  const [feedingData, friends, nonFriendUsers, friendRequests] =
    await Promise.all([
      feedingDataPromise,
      friendsPromise,
      nonFriendsPromise,
      pendingRequestsPromise,
      clearFriendRequestsPromise,
      syncUserPromise,
    ]);

  return { feedingData, friends, nonFriendUsers, friendRequests };
};
