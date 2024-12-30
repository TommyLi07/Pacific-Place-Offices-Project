import { memo } from "react";
import { ClipLoader } from "react-spinners";

export const LoadingSpinner = memo(() => (
  <div className="flex h-full w-full items-center justify-center bg-white">
    <ClipLoader size={32} color="#715e39" />
  </div>
));

export default LoadingSpinner;
