export enum ItemTypes {
  GIFT = "gift",
  ChARACTER = "character",
  COLORFUL_LETTER = "colorful_letter",
  MONOCHROME_LETTER = "monochrome_letter",
  QUOTE = "quote",
}

export interface IconInfo {
  id: string;
  key?: string;
  imageSrc?: string;
  type: ItemTypes;
  defaultX?: number;
  defaultY?: number;
  translateX?: number;
  translateY?: number;
}
