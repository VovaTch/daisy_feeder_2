import { FeedingList } from "./feeding-list";
import { FeedingSum } from "./feeding-sum";

/**
 * MainPage component renders the main page layout for the application.
 *
 * This component consists of two main sections:
 * 1. FeedingList: Displays a list of feeding cards.
 * 2. FeedingSum: Shows the overall summary of dry and wet food.
 *
 * @returns {JSX.Element} The rendered main page component.
 */
const MainPage = () => {
  return (
    <div key="main-page">
      <div
        key={"feeding-cards"}
        className="absolute w-full h-[calc(100vh-210px)] lg:h-[calc(100vh-250px)] 
      flex flex-row content-start flex-wrap top-20 left-0 overflow-y-auto justify-start items-start py-0"
      >
        <FeedingList />
      </div>
      <div
        key={"overall-dry-wet-food"}
        className="absolute left-0 bottom-[90px] items-center justify-center w-full h-20 bg-gradient-to-b
      from-white/50 to-transparent border-l-2 border-r-2 border-white rounded-md"
      >
        <FeedingSum />
      </div>
    </div>
  );
};

export default MainPage;
