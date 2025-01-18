"use server";

import db from "@/db/drizzle";
import { friendRequests, friends } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Creates a friend request from one user to another.
 *
 * This function checks if there is already a pending friend request
 * between the specified users. If no such request exists, it inserts
 * a new friend request into the database and revalidates the path
 * to update the settings page.
 *
 * @param userId - The ID of the user sending the friend request.
 * @param recipientId - The ID of the user receiving the friend request.
 * @returns A promise that resolves when the friend request is created.
 */
export const createFriendRequest = async (
  userId: string,
  recipientId: string
) => {
  const existingRequests = await db
    .select()
    .from(friendRequests)
    .where(
      and(
        eq(friendRequests.fromUserId, userId),
        eq(friendRequests.toUserId, recipientId),
        eq(friendRequests.status, "pending")
      )
    );
  if (existingRequests.length === 0) {
    await db.insert(friendRequests).values({
      fromUserId: userId,
      toUserId: recipientId,
      status: "pending",
    });
    revalidatePath("/main/settings");
  }
};

/**
 * Updates the status of a friend request in the database.
 *
 * @param {string} status - The new status to set for the friend request.
 * @param {number} requestId - The ID of the friend request to update.
 * @returns {Promise<any>} - A promise that resolves to the updated friend request.
 */
export const updateFriendRequest = async (
  requestId: number,
  status: "accepted" | "rejected"
) => {
  const updatedRequest = await db
    .update(friendRequests)
    .set({
      status: status,
    })
    .where(eq(friendRequests.id, requestId))
    .returning();

  if (updatedRequest.length === 0) {
    throw new Error(`Friend request with ID ${requestId} not found`);
  }

  if (status === "accepted") {
    await db.insert(friends).values({
      userId: updatedRequest[0].fromUserId,
      friendId: updatedRequest[0].toUserId,
    });
    await db.insert(friends).values({
      userId: updatedRequest[0].toUserId,
      friendId: updatedRequest[0].fromUserId,
    });
  }

  revalidatePath("/main/settings");
};

/**
 * Clears all friend requests that are not in the "pending" status.
 *
 * This function deletes all entries in the `friendRequests` table where the status
 * is not equal to "pending".
 *
 * @async
 * @function clearFriendRequests
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export const clearFriendRequests = async () => {
  await db.delete(friendRequests).where(ne(friendRequests.status, "pending"));
};

/**
 * Unfriends a user by deleting the friendship records from the database.
 *
 * This function performs the following steps:
 * 1. Deletes the friendship record where the user is the friend of the specified friend.
 * 2. Deletes the friendship record where the friend is the friend of the specified user.
 * 3. Clears any pending friend requests to allow re-friending.
 * 4. Revalidates the path to the settings page.
 *
 * @param userId - The ID of the user who is initiating the unfriend action.
 * @param friendId - The ID of the friend to be unfriended.
 * @returns A promise that resolves when the unfriending process is complete.
 */
export const unfriendUser = async (userId: string, friendId: string) => {
  await db
    .delete(friends)
    .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)));
  await db
    .delete(friends)
    .where(and(eq(friends.userId, friendId), eq(friends.friendId, userId)));
  await clearFriendRequests(); // Has to be done to allow re-friending
  revalidatePath("/main/settings");
};
