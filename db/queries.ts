import { cache } from "react";

import db from "@/db/drizzle";
import { eq, ne, inArray, and, not, or } from "drizzle-orm";
import { feedingItems, friendRequests, friends, users } from "./schema";
import { auth } from "@clerk/nextjs/server";

/**
 * Retrieves user data from the database and caches the result.
 *
 * This function first authenticates the user and retrieves the user ID.
 * If the user ID is not found, it returns null. Otherwise, it fetches
 * the user data by the user ID and returns it.
 *
 * @returns {Promise<null | UserData>} The user data if the user is authenticated, otherwise null.
 */
export const getUserData = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userData = await getUserDataById(userId);
  return userData;
});

/**
 * Retrieves user data by user ID from the database.
 *
 * @param userId - The unique identifier of the user.
 * @returns A promise that resolves to the user data object if found, otherwise null.
 */
export const getUserDataById = cache(async (userId: string) => {
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return userData[0] ?? null;
});

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
 * Retrieves all users from the database except the user with the specified ID.
 *
 * @param userId - The ID of the user to exclude from the results.
 * @returns A promise that resolves to an array of user objects.
 */
export const getAllOtherUsers = cache(async (userId: string) => {
  const allUsers = await db.select().from(users).where(ne(users.id, userId));
  return allUsers;
});

/**
 * Retrieves a list of users who are not friends with the specified user.
 *
 * @param userId - The ID of the user for whom to find non-friend users.
 * @returns A promise that resolves to an array of users who are not friends with the specified user.
 */
export const getNoneFriendUsers = cache(async (userId: string) => {
  const friendList = await db
    .select({ friendId: friends.friendId })
    .from(friends)
    .where(eq(friends.userId, userId));
  const friendListNoSelf = [{ friendId: userId }, ...friendList];
  const unfriendlyUsers = await db
    .select()
    .from(users)
    .where(
      not(
        inArray(
          users.id,
          friendListNoSelf.map((friend) => friend.friendId)
        )
      )
    );
  return unfriendlyUsers;
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
 * Retrieves the user profile by the given user ID.
 *
 * @param userId - The unique identifier of the user.
 * @returns A promise that resolves to the user profile object if found, otherwise null.
 */
export const getUserProfileById = cache(async (userId: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user[0] ?? null;
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

export const getPendingFriendRequest = cache(
  async (fromUserId: string, toUserId: string) => {
    const pendingRequest = await db
      .select()
      .from(friendRequests)
      .where(
        and(
          eq(friendRequests.fromUserId, fromUserId),
          eq(friendRequests.toUserId, toUserId),
          eq(friendRequests.status, "pending")
        )
      );
    return pendingRequest[0] ?? null;
  }
);
