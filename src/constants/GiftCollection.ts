import ElectronicBagImg from "@/assets/images/Bags/ElectronicBag.png";
import WellnessBagImg from "@/assets/images/Bags/WellnessBag.png";
import WorkfolioBagImg from "@/assets/images/Bags/WorkfolioBag.png";
import { ItemTypes } from "@/types";

export const GiftCollection = [
  {
    key: "gifts",
    iconInfos: [
      {
        imageSrc: ElectronicBagImg,
        id: "electronic_bag",
        type: ItemTypes.GIFT,
      },
      {
        imageSrc: WellnessBagImg,
        id: "wellness_bag",
        type: ItemTypes.GIFT,
      },
      {
        imageSrc: WorkfolioBagImg,
        id: "workfolio",
        type: ItemTypes.GIFT,
      },
    ],
  },
];
