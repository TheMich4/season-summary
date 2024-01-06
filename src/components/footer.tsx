import { Icons } from "./icons";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="flex h-14 w-full flex-row items-center justify-center gap-2 bg-background/60 px-4 text-foreground backdrop-blur">
      <div className="flex flex-row items-baseline gap-2 text-base">
        <p className="font-bold dark:text-primary">dyczkowski.dev</p>
        <p className="text-sm">All rights reserved.</p>
      </div>
    </footer>
  );
};
