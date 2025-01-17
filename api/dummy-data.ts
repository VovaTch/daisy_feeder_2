// TODO: remove when valid data is available

import { FeedingItem } from "@/components/types/food-item";

export const DummyData = [
  {
    id: 1,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 10,
    datetime: new Date(),
    foodType: "dry" as const,
  },
  {
    id: 2,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 15,
    datetime: new Date(),
    foodType: "wet" as const,
  },
  {
    id: 3,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 20,
    datetime: new Date(),
    foodType: "dry" as const,
  },
  {
    id: 4,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 35,
    datetime: new Date(),
    foodType: "wet" as const,
  },
  {
    id: 5,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 20,
    datetime: new Date(),
    foodType: "dry" as const,
  },
  {
    id: 6,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 35,
    datetime: new Date(),
    foodType: "wet" as const,
  },
  {
    id: 7,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 20,
    datetime: new Date(),
    foodType: "dry" as const,
  },
  {
    id: 8,
    feeder: "Dvovivov",
    feederAvatarUrl: "/images/default_avatar.png",
    amount: 35,
    datetime: new Date(),
    foodType: "wet" as const,
  },
] satisfies FeedingItem[];

export const EmptyDummyData = [];
