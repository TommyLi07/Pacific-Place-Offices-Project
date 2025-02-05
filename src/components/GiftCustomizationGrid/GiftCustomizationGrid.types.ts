import { IconInfo } from "@/types";

export interface GiftCustomizationGridProps {
  title: string;
  iconInfos: IconInfo[];
  index: number;
  selectedBag: IconInfo;
  selectedIcons: IconInfo[];
  handleClick: (iconInfo: IconInfo) => void;
}
