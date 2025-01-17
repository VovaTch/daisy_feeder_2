import { feedingItems, users } from "@/db/schema";

export type FeedingItem = {
  id: typeof feedingItems.$inferSelect.id;
  feeder: typeof users.$inferSelect.username;
  amount: typeof feedingItems.$inferSelect.amount;
  datetime: typeof feedingItems.$inferSelect.datetime;
  foodType: typeof feedingItems.$inferSelect.foodType;
  feederAvatarUrl: typeof users.$inferSelect.avatarUrl;
};
