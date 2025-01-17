import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const syncUser = async () => {
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

  revalidatePath("/main");

  return upsertedUser[0];
};
