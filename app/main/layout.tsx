import { clearFriendRequests } from "@/actions/friend-requests";
import { MobileHeader } from "@/components/custom/mobile-header";
import { Sidebar } from "@/components/custom/sidebar";
import {
  getFeedingItems,
  getFriendUsers,
  getNoneFriendNonRequestUsers,
  getPendingFriendRequests,
} from "@/db/queries";
import DaisyFeederContextProvider from "@/providers/context";
import { auth } from "@clerk/nextjs/server";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const feedingDataPromise = getFeedingItems(userId);
  const friendsPromise = getFriendUsers(userId);
  const nonFriendUsersPromise = getNoneFriendNonRequestUsers(userId);
  const friendRequestsPromise = getPendingFriendRequests(userId);
  const clearFriendRequestsPromise = clearFriendRequests();

  const [feedingData, friends, nonFriendUsers, friendRequests] =
    await Promise.all([
      feedingDataPromise,
      friendsPromise,
      nonFriendUsersPromise,
      friendRequestsPromise,
      clearFriendRequestsPromise,
    ]);

  return (
    <div>
      <MobileHeader key="main-page-header" />
      <Sidebar
        key="sidebar"
        className="hidden lg:flex bg-orange-200/90 bg-blend-overlay bg-[url('/images/daisy-drawer.jpg')]"
      />
      <main key="main" className="lg:pl-[350px] lg:pt-0 pt-[50px] ">
        <div className="bg-cover bg-center lg:h-screen h-[calc(100vh-50px)] bg-orange-100/50 bg-blend-overlay bg-[url('/images/daisy-main.jpg')]">
          <div className="max-w-[1200px] mx-auto relative h-full justify-between my-auto">
            <DaisyFeederContextProvider
              feedingItems={feedingData}
              friends={friends}
              nonFriends={nonFriendUsers}
              friendRequests={friendRequests}
            >
              {children}
            </DaisyFeederContextProvider>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
