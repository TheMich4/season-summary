import { Icons } from "./icons";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="flex h-14 w-full items-center justify-between bg-background/60 px-4 text-foreground backdrop-blur">
      <div className="flex items-center space-x-4">
        <Icons.home className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm">© Michał Dyczkowski All rights reserved.</p>
      </div>
      <div className="flex space-x-4">
        <Link className="text-white hover:text-gray-300" href="#">
          <FaXTwitter className="h-5 w-5" />
        </Link>
        <Link className="text-white hover:text-gray-300" href="#">
          <Icons.gitHub className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
};
