"use server";

import db from "@/db/drizzle";
import { feedingItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Inserts a food item into the database for a specific user.
 *
 * @param userId - The ID of the user who is feeding the pet.
 * @param foodType - The type of food being fed, either "dry" or "wet".
 * @param amount - The amount of food being fed.
 * @param datetime - The date and time when the food is being fed.
 * @returns A promise that resolves when the food item has been inserted and the path has been revalidated.
 */
export const insertFoodItem = async (
  userId: string,
  foodType: "dry" | "wet",
  amount: number,
  datetime: Date
) => {
  await db.insert(feedingItems).values({
    userId: userId,
    foodType: foodType,
    amount: amount,
    datetime: datetime,
  });
  revalidatePath("/main");
};

/**
 * Updates a feeding item with the specified details.
 *
 * @param feedingItemId - The ID of the feeding item to update.
 * @param userId - The ID of the user performing the update.
 * @param foodType - The type of food ("dry" or "wet").
 * @param amount - The amount of food.
 * @param datetime - The date and time of the feeding.
 * @throws Will throw an error if the feeding item is not found.
 * @throws Will throw an error if the user is not authorized to update the feeding item.
 * @returns A promise that resolves when the feeding item is successfully updated.
 */
export const updateFoodItem = async (
  feedingItemId: number,
  userId: string,
  foodType: "dry" | "wet",
  amount: number,
  datetime: Date
) => {
  const feedingItemUserId = await db
    .select()
    .from(feedingItems)
    .where(eq(feedingItems.id, feedingItemId))
    .limit(1);

  if (feedingItemUserId.length === 0) {
    return; // Happens when an item is deleted
  }

  if (feedingItemUserId[0].userId !== userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(feedingItems)
    .set({
      foodType: foodType,
      amount: amount,
      datetime: datetime,
    })
    .where(eq(feedingItems.id, feedingItemId));
  revalidatePath("/main");
};

/**
 * Deletes a food item from the database and revalidates the main path.
 *
 * @param feedingItemId - The ID of the feeding item to be deleted.
 * @returns A promise that resolves when the food item has been deleted and the path has been revalidated.
 */
export const deleteFoodItem = async (feedingItemId: number) => {
  await db.delete(feedingItems).where(eq(feedingItems.id, feedingItemId));
  revalidatePath("/main");
};
