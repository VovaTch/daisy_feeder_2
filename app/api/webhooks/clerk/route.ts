import { clearFriendRequests } from "@/actions/friend-requests";
import { syncUser } from "@/actions/users";

/**
 * Handles POST requests for the Clerk webhook.
 *
 * This function processes incoming webhook events from Clerk. It specifically handles
 * "user.created" and "user.updated" events. When such an event is received, it triggers
 * the `syncUser` and `clearFriendRequests` functions concurrently.
 *
 * @param {Request} req - The incoming request object containing the webhook event.
 * @returns {Promise<void>} - A promise that resolves when the event has been processed.
 */
export async function POST(req: Request) {
  const event = await req.json();
  if (event.type === "user.created" || event.type === "user.updated") {
    const syncPromise = syncUser();
    const clearRequestsPromise = clearFriendRequests();
    await Promise.all([syncPromise, clearRequestsPromise]);
  }
}
