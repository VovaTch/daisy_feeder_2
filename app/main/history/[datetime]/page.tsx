import HistoryFeedingList from "./feeding-list";
import HistoryFeedingSum from "./feeding-sum";

type HistoryPageProps = {
  params: {
    datetime: string;
  };
};

/**
 * HistoryPage component displays the feeding history for a specific datetime.
 *
 * @param {HistoryPageProps} props - The properties object.
 * @param {object} props.params - The parameters object.
 * @param {string} props.params.datetime - The datetime string used to fetch the feeding history.
 *
 * @returns {JSX.Element} The rendered HistoryPage component.
 */
const HistoryPage = async ({ params }: HistoryPageProps) => {
  const { datetime } = await params;

  return (
    <>
      <div
        key={"feeding-cards"}
        className="absolute flex flex-row flex-wrap w-full lg:h-[calc(100vh-190px)] h-[calc(100vh-240px)]
        content-start overflow-y-auto justify-start items-start py-0 top-20 left-0"
      >
        <HistoryFeedingList datetime={datetime} />
      </div>
      <div
        key={"overall-dry-wet-food"}
        className="absolute left-0 bottom-[30px] items-center justify-center w-full h-20 bg-gradient-to-b
      from-white/50 to-transparent border-l-2 border-r-2 border-white rounded-md"
      >
        <HistoryFeedingSum datetime={datetime} />
      </div>
    </>
  );
};

export default HistoryPage;
