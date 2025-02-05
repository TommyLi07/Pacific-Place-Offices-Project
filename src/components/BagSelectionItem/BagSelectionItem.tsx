import { clsx } from "clsx";
import { Trans, useTranslation } from "react-i18next";
import { IBagSelectionItemProps } from "./BagSelectionItem.types";

export const BagSelectionItem = ({
  imageSrc,
  title,
  desc,
  index,
  onClick,
}: IBagSelectionItemProps) => {
  const { t } = useTranslation();

  const handleClick = (title: string) => {
    onClick(title);
  };

  return (
    <div
      id={index === 0 ? "first-bag" : undefined}
      className={clsx(
        "h-max-[800px] bg-alabaster p-6 lg:h-[760px] lg:p-2 xl:h-[780px] 2xl:h-[700px] 2xl:px-4",
        {
          "mt-4": index ? index > 0 : false,
        },
        "lg:mt-0",
      )}
    >
      <img
        src={imageSrc}
        alt="bag"
        className="h-1/2 w-full object-contain lg:h-3/5 xl:h-2/3"
      />
      <h2 className="font-PP_Tondo_Signage mt-2 text-center text-2xl xl:text-4xl">
        {t(title)}
      </h2>
      <p className="mt-3 text-center">
        <Trans
          i18nKey={desc}
          components={{ bold: <strong />, underline: <u /> }}
        />
      </p>
      <div className="mt-5 text-center">
        <button
          className={clsx(
            "rounded-lg border border-black px-7 py-2 xl:px-7 xl:py-3",
          )}
          onClick={() => handleClick(title)}
        >
          {t("select_bag")}
        </button>
      </div>
    </div>
  );
};

export default BagSelectionItem;
