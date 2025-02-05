import clsx from "clsx";
import { GiftCustomizationSectionProps } from "./GiftCustomizationSection.types";

export const GiftCustomizationSection = ({
  title,
  subtitle,
  index,
  children,
}: GiftCustomizationSectionProps) => {
  return (
    <div className={clsx({ "mt-4": index > 0 })}>
      <h2 className="font-Tondo_W01_Signage text-xl">{title}</h2>
      <h3 className="mt-2 text-xs">{subtitle}</h3>
      <div className={clsx({ "mt-8": index > 0 })}>{children}</div>
    </div>
  );
};

export default GiftCustomizationSection;
