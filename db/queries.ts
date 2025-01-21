import { cache } from "react";

import db from "@/db/drizzle";
import { eq, inArray, and, not, or } from "drizzle-orm";
import { feedingItems, friendRequests, friends, users } from "./schema";

/**
 * Retrieves feeding items for a user and their friends from the database.
 *
 * @param userId - The ID of the user whose feeding items are to be retrieved.
 * @returns A promise that resolves to an array of feeding items, each containing:
 * - `id`: The ID of the feeding item.
 * - `amount`: The amount of food.
 * - `datetime`: The date and time when the feeding occurred.
 * - `foodType`: The type of food.
 * - `feeder`: The username of the person who fed.
 * - `feederAvatarUrl`: The avatar URL of the person who fed.
 */
export const getFeedingItems = cache(async (userId: string) => {
  const friendList = await db
    .select({ friendId: friends.friendId })
    .from(friends)
    .where(eq(friends.userId, userId));
  const friendIds = friendList.map((friend) => friend.friendId);
  const allRequiredIds = [userId, ...friendIds];

  const selectedFeedingItems = await db
    .select({
      id: feedingItems.id,
      amount: feedingItems.amount,
      datetime: feedingItems.datetime,
      foodType: feedingItems.foodType,
      feeder: users.username,
      feederAvatarUrl: users.avatarUrl,
    })
    .from(feedingItems)
    .innerJoin(users, eq(feedingItems.userId, users.id))
    .where(inArray(feedingItems.userId, allRequiredIds))
    .orderBy(feedingItems.datetime);
  return selectedFeedingItems;
});

/**
 * Retrieves a list of users who are neither friends nor have pending friend requests with the given user.
 *
 * @param userId - The ID of the user for whom to find non-friend, non-request users.
 * @returns A promise that resolves to a list of users who are neither friends nor have pending friend requests with the given user.
 */
export const getNoneFriendNonRequestUsers = cache(async (userId: string) => {
  const friendList = await db
    .select({ friendId: friends.friendId })
    .from(friends)
    .where(eq(friends.userId, userId));
  const friendListNoSelf = [{ friendId: userId }, ...friendList];
  const friendRequestList = await db
    .select({ fromUserId: friendRequests.fromUserId })
    .from(friendRequests)
    .where(
      and(
        or(
          eq(friendRequests.toUserId, userId),
          eq(friendRequests.fromUserId, userId)
        ),
        eq(friendRequests.status, "pending")
      )
    );
  const friendRequestListNoSelf = [
    { fromUserId: userId },
    ...friendRequestList,
  ];
  const unfriendlyUsers = await db
    .select()
    .from(users)
    .where(
      and(
        not(
          inArray(
            users.id,
            friendListNoSelf.map((friend) => friend.friendId)
          )
        ),
        not(
          inArray(
            users.id,
            friendRequestListNoSelf.map((friend) => friend.fromUserId)
          )
        )
      )
    );
  return unfriendlyUsers;
});

/**
 * Retrieves a list of user objects who are friends of the specified user.
 *
 * @param userId - The ID of the user whose friends are to be retrieved.
 * @returns A promise that resolves to an array of user objects representing the friends of the specified user.
 */
export const getFriendUsers = cache(async (userId: string) => {
  const friendList = await db
    .select({ friendId: friends.friendId })
    .from(friends)
    .where(eq(friends.userId, userId));
  const friendUsers = await db
    .select()
    .from(users)
    .where(
      inArray(
        users.id,
        friendList.map((friend) => friend.friendId)
      )
    );
  return friendUsers;
});

/**
 * Retrieves the list of pending friend requests for a given user.
 *
 * @param userId - The ID of the user for whom to retrieve pending friend requests.
 * @returns A promise that resolves to an array of pending friend requests, each containing:
 *  - fromUserId: The ID of the user who sent the friend request.
 *  - fromUserUsername: The username of the user who sent the friend request.
 *  - fromUserAvatarUrl: The avatar URL of the user who sent the friend request.
 */
export const getPendingFriendRequests = cache(async (userId: string) => {
  const pendingRequests = await db
    .select({
      requestId: friendRequests.id,
      fromUserId: users.id,
      fromUserUsername: users.username,
      fromUserAvatarUrl: users.avatarUrl,
    })
    .from(friendRequests)
    .innerJoin(users, eq(friendRequests.fromUserId, users.id))
    .where(
      and(
        eq(friendRequests.toUserId, userId),
        eq(friendRequests.status, "pending")
      )
    );
  return pendingRequests;
});
