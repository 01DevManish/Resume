import { Button } from "@/components/ui/button";
import { LucideTriangleAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen justify-center items-center flex-col gap-5">
      <p className="rounded-full bg-secondary p-4 text-sm font-medium flex justify-center items-center">
        <LucideTriangleAlert className="size-20" />
      </p>
      <h2 className="text-4xl">Page Not Found</h2>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
