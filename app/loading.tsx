import { Loader } from "lucide-react";

/**
 * FirstLoader component renders a centered spinning loader.
 *
 * @returns {JSX.Element} A div containing a spinning loader with specific styles.
 */
const FirstLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Loader className="lg:h-[260px] lg:w-[260px] h-[120px] w-[120px] text-orange-500 bg-white rounded-full p-5 animate-spin" />
    </div>
  );
};

export default FirstLoader;
