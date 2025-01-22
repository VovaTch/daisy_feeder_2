"use server";

import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Synchronizes the current user by fetching the user ID and full user details,
 * then upserts the user data into the database. If the user is unauthorized,
 * an error is thrown. After upserting the user data, the main path is revalidated aaa.
 *
 * @returns {Promise<object>} The upserted user data.
 * @throws {Error} If the user is unauthorized.
 */
export const syncUser = async () => {
  console.log(`Syncing user...`);
  const { userId } = await auth();
  const fullUser = await currentUser();

  if (!userId || !fullUser) {
    throw new Error("Unauthorized");
  }

  const currentUserData = {
    id: userId,
    username: fullUser.username ?? `User_${userId.slice(-6)}`,
    avatarUrl: fullUser.imageUrl,
  };

  const upsertedUser = await db
    .insert(users)
    .values(currentUserData)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        username: currentUserData.username,
        avatarUrl: currentUserData.avatarUrl,
      },
    })
    .returning();

  return upsertedUser[0];
};
