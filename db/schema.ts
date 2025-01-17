import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const foodTypeEnum = pgEnum("food_type", ["dry", "wet"]);

/**
 * Represents the schema for the "users" table in the database.
 *
 * The table contains the following columns:
 * - `id`: The primary key of the user, represented as a text.
 * - `username`: The username of the user, represented as a text. This field is required and must be unique.
 * - `avatarUrl`: The URL of the user's avatar, represented as a text.
 *    This field is required and defaults to "/images/default_avatar.png" if not provided.
 */
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  avatarUrl: text("avatar_url").notNull().default("/images/default_avatar.png"),
});

export const feedingItems = pgTable("feeding_items", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  foodType: foodTypeEnum("food_type").notNull(),
  amount: integer("amount").notNull(),
  datetime: timestamp("datetime").defaultNow().notNull(),
});

export const friends = pgTable(
  "friends",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    friendId: text("friend_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      name: "friends_pk",
      columns: [table.userId, table.friendId],
    }),
  ]
);

export const requestStatusEnum = pgEnum("status", [
  "pending",
  "accepted",
  "rejected",
]);

export const friendRequests = pgTable("friend_requests", {
  id: serial("id").primaryKey(),
  fromUserId: text("from_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  toUserId: text("to_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: requestStatusEnum().notNull(),
});

export const feedingItemRelations = relations(feedingItems, ({ one }) => ({
  user: one(users, {
    fields: [feedingItems.userId],
    references: [users.id],
  }),
}));

export const friendsRequestRelations = relations(friendRequests, ({ one }) => ({
  fromUser: one(users, {
    fields: [friendRequests.fromUserId],
    references: [users.id],
  }),
  toUser: one(users, {
    fields: [friendRequests.toUserId],
    references: [users.id],
  }),
}));
