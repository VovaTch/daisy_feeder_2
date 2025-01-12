import { Droplet, Sun } from "lucide-react";
import { FeedingItem } from "../types/food-item";

type OverallFoodProps = {
  feedingData: FeedingItem[];
};

const OverallDryWetFood = ({ feedingData }: OverallFoodProps) => {
  const totalDryFood = PerBatchSumFood({ feedingData, foodType: "dry" });
  const totalWetFood = PerBatchSumFood({ feedingData, foodType: "wet" });

  return (
    <div className="items-center justify-center flex flex-col ">
      <h1 className="text-xl font-bold text-orange-500 tracking-widest">
        Overall:
      </h1>
      <div className="flex flex-1 items-center justify-between">
        <h2
          className="lg:px-20 lg:mx-10 py-3 px-10 mx-5 bg-slate-100 bg-[url('/images/dry-food.jpg')] bg-blend-overlay bg-cover
              rounded-sm lg:text-xl text-red-600 flex flex-row"
        >
          {totalDryFood} dry food
          <Sun className="h-6 w-6 text-red-600" />
        </h2>
        <h2
          className="lg:px-20 lg:mx-10 py-3 px-10 mx-5 bg-slate-100 bg-[url('/images/wet-food.jpg')] bg-blend-overlay bg-cover
              rounded-sm lg:text-xl text-blue-500 flex flex-row"
        >
          {totalWetFood} wet food
          <Droplet className="h-6 w-6 text-blue-500" />
        </h2>
      </div>
    </div>
  );
};

export default OverallDryWetFood;

type PerBatchSummationProps = {
  feedingData: FeedingItem[];
  foodType: "dry" | "wet";
  date?: string;
};

export const PerBatchSumFood = ({
  feedingData,
  foodType,
  date,
}: PerBatchSummationProps) => {
  return feedingData
    .filter((item) => {
      if (date) {
        return (
          item.datetime.toISOString().slice(0, 10) === date &&
          item.foodChoice === foodType
        );
      } else {
        return item.foodChoice === foodType;
      }
    })
    .reduce((total, curr) => {
      return total + curr.amount;
    }, 0);
};
