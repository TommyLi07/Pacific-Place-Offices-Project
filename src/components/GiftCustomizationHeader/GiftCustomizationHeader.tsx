import ArrowLeftIcon from "@/assets/icons/ArrowLeft.svg?react";
import { GiftCustomizationProps } from "./GiftCustomizationHeader.types";

export const GiftCustomizationHeader = ({
  title,
  onBack,
}: GiftCustomizationProps) => {
  return (
    <div className="flex h-16 flex-row items-center bg-white px-6">
      <button
        className="rounded-2xl border-2 border-gray-300 p-2 shadow-md shadow-slate-300 transition-all duration-150 active:scale-95 active:opacity-75"
        onClick={onBack}
      >
        <ArrowLeftIcon />
      </button>

      {title && <p className="font-PP_Tondo_Signage ml-4 text-2xl">{title}</p>}
    </div>
  );
};

export default GiftCustomizationHeader;
