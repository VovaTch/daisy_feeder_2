import { clearFriendRequests } from "@/actions/friend-requests";
import { syncUser } from "@/actions/users";
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

/**
 * MainLayout component that provides the main layout structure for the application.
 * It ensures the user is authenticated and fetches necessary data before rendering the children components.
 *
 * @param {Props} props - The properties passed to the MainLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered layout component.
 *
 * @throws {Error} Throws an error if the user is not authenticated.
 *
 * @async
 * @function
 *
 * @example
 * ```tsx
 * <MainLayout>
 *   <YourComponent />
 * </MainLayout>
 * ```
 */
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
  const syncUserPromise = syncUser();

  const [feedingData, friends, nonFriendUsers, friendRequests] =
    await Promise.all([
      feedingDataPromise,
      friendsPromise,
      nonFriendUsersPromise,
      friendRequestsPromise,
      clearFriendRequestsPromise,
      syncUserPromise,
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
