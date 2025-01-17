import { syncUser } from "@/actions/users";

export async function POST(req: Request) {
  const event = await req.json();
  if (event.type === "user.created" || event.type === "user.updated") {
    await syncUser();
  }
}
