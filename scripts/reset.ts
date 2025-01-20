import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";
import { and, ne } from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Resetting database...");
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

    console.log(
      "Resetting finished, database is now empty except for Dvovivov"
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the database");
  }
};

main();
