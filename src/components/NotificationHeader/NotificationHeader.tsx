import CloseIcon from "@/assets/icons/Close.svg?react";
import { memo } from "react";
import { NotificationHeaderProps } from "./NotificationHeader.types";

export const NotificationHeader = memo<NotificationHeaderProps>(
  ({ notificationMessage, onClick, ref }) => {
    return (
      <div
        ref={ref}
        className="bg-yellow_metal flex w-full flex-row items-center gap-2 px-6 py-4 md:py-3"
      >
        <p className="flex-1 text-xs text-slate-100 md:text-center md:text-sm">
          {notificationMessage}
        </p>
        <CloseIcon className="h-5 w-5" onClick={onClick} />
      </div>
    );
  },
);

export default NotificationHeader;
