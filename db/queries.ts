import { cache } from "react";

import db from "@/db/drizzle";
import { eq, inArray } from "drizzle-orm";
import { feedingItems, friends, users } from "./schema";
import { auth } from "@clerk/nextjs/server";

export const getUserData = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userData = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return userData[0] ?? null;
});

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
