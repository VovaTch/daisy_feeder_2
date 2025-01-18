import { friendRequests, users } from "@/db/schema";

export type UserProfile = {
  id: typeof users.$inferSelect.id;
  username: typeof users.$inferSelect.username;
  avatarUrl: typeof users.$inferSelect.avatarUrl;
};

export type RequestingUserProfile = {
  fromUserId: typeof users.$inferSelect.id;
  fromUserUsername: typeof users.$inferSelect.username;
  fromUserAvatarUrl: typeof users.$inferSelect.avatarUrl;
};

export type FriendRequest = {
  id: typeof friendRequests.$inferSelect.id;
  requesterId: typeof friendRequests.$inferSelect.fromUserId;
  recipientId: typeof friendRequests.$inferSelect.toUserId;
  status: typeof friendRequests.$inferSelect.status;
};
