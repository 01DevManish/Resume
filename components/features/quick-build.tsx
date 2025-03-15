import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import FlashIcon from "./flash-icon";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const QuickBuild = () => {
  return (
    <div className="transform-gpu group relative shadow-[0_-20px_80px_-50px_#7877c64d_inset] border-[1px] border-[rgba(255, 255, 255, .1)] max-w-80 rounded-md bg-[#09090b] h-[22.5rem] flex overflow-hidden">
      <div className="h-96 linear-mask-2 absolute bottom-3">
        <FlashIcon />
      </div>

      <div className="justify-end text-center pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <h3 className="text-xl font-semibold  text-neutral-400">
          Lightning fast
        </h3>
        <p className="max-w-lg text-neutral-700">
          Create a professional resume in minutes with our intuitive interface.
        </p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 translate-x-1/4 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="pointer-events-auto"
        >
          <Link href="/quick-build">
            Start Building
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-800/10" />
    </div>
  );
};

export default QuickBuild;
