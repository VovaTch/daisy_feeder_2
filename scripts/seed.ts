import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";
import { and, eq, ne, or } from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

/**
 * Function to seed the database with dummy data for testing.
 *
 * This function performs the following operations:
 * 1. Deletes existing users except for those with usernames "Dvovivov" and "dvovivov".
 * 2. Deletes all existing feeding items, friend requests, and friends.
 * 3. Creates dummy users: Alice, Bob, and Charlie.
 * 4. Retrieves the user data for "Dvovivov" or "dvovivov".
 * 5. Creates dummy feeding data for the users.
 * 6. Creates a friend request from Alice to Dvovivov.
 * 7. Adds Charlie and Dvovivov as friends.
 *
 * @throws {Error} If the user "Dvovivov" or "dvovivov" is not found.
 * @throws {Error} If any operation fails during the seeding process.
 */
const main = async () => {
  try {
    console.log("Seeding database...");
    await db
      .delete(schema.users)
      .where(
        and(
          ne(schema.users.username, "Dvovivov"),
          ne(schema.users.username, "dvovivov")
        )
      );
    await db.delete(schema.feedingItems);
    await db.delete(schema.friendRequests);
    await db.delete(schema.friends);

    // Creating dummy users
    const addedUsers = await db
      .insert(schema.users)
      .values([
        {
          id: "user1",
          username: "Alice",
          avatarUrl: "https://i.pravatar.cc/150?img=1",
        },
        {
          id: "user2",
          username: "Bob",
          avatarUrl: "https://i.pravatar.cc/150?img=2",
        },
        {
          id: "user3",
          username: "Charlie",
          avatarUrl: "https://i.pravatar.cc/150?img=3",
        },
      ])
      .returning();

    const [alice, bob, charlie] = addedUsers;
    const dvovivovUsers = await db
      .select()
      .from(schema.users)
      .where(
        or(
          eq(schema.users.username, "Dvovivov"),
          eq(schema.users.username, "dvovivov")
        )
      )
      .limit(1);

    if (dvovivovUsers.length === 0) {
      throw new Error("Dvovivov user not found");
    }
    const dvovivovUserData = dvovivovUsers[0];

    // Creating dummy feeding data
    const yesterdayTime = new Date();
    yesterdayTime.setDate(yesterdayTime.getDate() - 1);
    const twoDaysAgoTime = new Date();
    twoDaysAgoTime.setDate(twoDaysAgoTime.getDate() - 2);
    const sixHoursAgoTime = new Date();
    sixHoursAgoTime.setHours(sixHoursAgoTime.getHours() - 6);
    await db.insert(schema.feedingItems).values([
      {
        userId: alice.id,
        foodType: "dry",
        amount: 20,
        datetime: new Date(),
      },
      {
        userId: bob.id,
        foodType: "wet",
        amount: 25,
        datetime: new Date(),
      },
      {
        userId: bob.id,
        foodType: "wet",
        amount: 18,
        datetime: new Date(),
      },
      {
        userId: charlie.id,
        foodType: "dry",
        amount: 12,
        datetime: new Date(),
      },
      {
        userId: charlie.id,
        foodType: "wet",
        amount: 8,
        datetime: twoDaysAgoTime,
      },
      {
        userId: charlie.id,
        foodType: "dry",
        amount: 13,
        datetime: new Date(),
      },
      {
        userId: dvovivovUserData.id,
        foodType: "wet",
        amount: 14,
        datetime: yesterdayTime,
      },
      {
        userId: dvovivovUserData.id,
        foodType: "dry",
        amount: 31,
        datetime: new Date(),
      },
      {
        userId: dvovivovUserData.id,
        foodType: "dry",
        amount: 17,
        datetime: sixHoursAgoTime,
      },
    ]);

    // Create a friend request
    await db.insert(schema.friendRequests).values({
      fromUserId: alice.id,
      toUserId: dvovivovUserData.id,
      status: "pending",
    });

    // Add a friend
    await db.insert(schema.friends).values([
      {
        userId: charlie.id,
        friendId: dvovivovUserData.id,
      },
      {
        userId: dvovivovUserData.id,
        friendId: charlie.id,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
