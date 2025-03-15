"use client";

import Link from "next/link";

import { cn, getCurrentPath } from "@/lib/utils";
import { FileImage, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = getCurrentPath(usePathname());
  return (
    <footer className="md:hidden absolute bottom-0 w-full border-t border-t-primary-foreground bg-[#09090b]">
      <ul className="flex items-center justify-between px-12 max-w-[400px] mx-auto">
        <li>
          <Link
            href="content"
            className={cn(
              "flex flex-col items-center py-3.5 transform duration-300",
              pathname === "content"
                ? "border-t-2 border-white"
                : "text-secondary"
            )}
          >
            <LayoutDashboard />
            <span>Content</span>
          </Link>
        </li>
        <li>
          <Link
            href="preview"
            className={cn(
              "flex flex-col items-center py-3.5 transform duration-300",
              pathname === "preview"
                ? "border-t-2 border-white"
                : "text-secondary"
            )}
          >
            <FileImage />
            <span>Preview</span>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;