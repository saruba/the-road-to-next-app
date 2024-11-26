import { LoaderCircleIcon } from "lucide-react";

const Spinner = () => {
  return (
    <div
      role="status"
      className="flex-1 flex flex-col items-center justify-center self-center"
    >
      <LoaderCircleIcon className="h-16 w-16 animate-spin" />
    </div>
  );
};

export { Spinner };
