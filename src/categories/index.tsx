//birds
import bird1 from "@/assets/birds/bird-1.png";
import bird2 from "@/assets/birds/bird-2.svg";
import bird3 from "@/assets/birds/bird-3.svg";
import bird4 from "@/assets/birds/bird-4.svg";
import bird5 from "@/assets/birds/bird-5.svg";
import bird6 from "@/assets/birds/bird-6.svg";
import bird7 from "@/assets/birds/bird-7.svg";
import bird8 from "@/assets/birds/bird-8.svg";
import bird9 from "@/assets/birds/bird-9.svg";
import bird10 from "@/assets/birds/bird-10.svg";
import bird11 from "@/assets/birds/bird-11.svg";
import bird12 from "@/assets/birds/bird-12.svg";
import bird13 from "@/assets/birds/bird-13.svg";
import bird14 from "@/assets/birds/bird-14.svg";
import bird15 from "@/assets/birds/bird-15.svg";
import bird16 from "@/assets/birds/bird-16.svg";
import bird17 from "@/assets/birds/bird-17.svg";
import bird18 from "@/assets/birds/bird-18.svg";
import bird19 from "@/assets/birds/bird-19.svg";
import bird20 from "@/assets/birds/bird-20.svg";
import bird21 from "@/assets/birds/bird-21.svg";
import bird22 from "@/assets/birds/bird-22.svg";
import bird23 from "@/assets/birds/bird-23.svg";
//event
import event from "@/assets/events/event-1.svg";
//food
import food from "@/assets/food/food-1.svg";
//gym
import gym from "@/assets/gym/gym-1.svg";
//workspace
import workspace from "@/assets/workspace/workspace-1.svg";

export const experiences: {
  cateogry: {
    type:
      | "bird_watching"
      | "food_rating"
      | "workspace"
      | "event"
      | "gym"
      | null;
    images: { type: string; url: string }[];
  };
}[] = [
  {
    cateogry: {
      type: "bird_watching",
      images: [
        {
          type: "bird-1",
          url: bird1,
        },
        {
          type: "bird-2",
          url: bird2,
        },
        {
          type: "bird-3",
          url: bird3,
        },
        {
          type: "bird-4",
          url: bird4,
        },
        {
          type: "bird-5",
          url: bird5,
        },
        {
          type: "bird-6",
          url: bird6,
        },
        {
          type: "bird-7",
          url: bird7,
        },
        {
          type: "bird-8",
          url: bird8,
        },
        {
          type: "bird-9",
          url: bird9,
        },
        {
          type: "bird-10",
          url: bird10,
        },
        {
          type: "bird-11",
          url: bird11,
        },
        {
          type: "bird-12",
          url: bird12,
        },
        {
          type: "bird-13",
          url: bird13,
        },
        {
          type: "bird-14",
          url: bird14,
        },
        {
          type: "bird-15",
          url: bird15,
        },
        {
          type: "bird-16",
          url: bird16,
        },
        {
          type: "bird-17",
          url: bird17,
        },
        {
          type: "bird-18",
          url: bird18,
        },
        {
          type: "bird-19",
          url: bird19,
        },
        {
          type: "bird-20",
          url: bird20,
        },
        {
          type: "bird-21",
          url: bird21,
        },
        {
          type: "bird-22",
          url: bird22,
        },
        {
          type: "bird-23",
          url: bird23,
        },
      ],
    },
  },
  {
    cateogry: {
      type: "event",
      images: [
        {
          type: "event",
          url: event,
        },
      ],
    },
  },
  {
    cateogry: {
      type: "food_rating",
      images: [
        {
          type: "food",
          url: food,
        },
      ],
    },
  },
  {
    cateogry: {
      type: "gym",
      images: [
        {
          type: "gym",
          url: gym,
        },
      ],
    },
  },
  {
    cateogry: {
      type: "workspace",
      images: [
        {
          type: "workspace",
          url: workspace,
        },
      ],
    },
  },
];
