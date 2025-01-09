// TODO: temporary until a schema is implemented?

export type FeedingItem = {
  id: number;
  feeder: string;
  amount: number;
  datetime: Date;
  foodChoice: "dry" | "wet";
};
