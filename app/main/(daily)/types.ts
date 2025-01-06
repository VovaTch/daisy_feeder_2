export type FeedingItem = {
  id: number;
  feeder: string;
  amount: number;
  datetime: number;
  foodChoice: "dry" | "wet";
};
