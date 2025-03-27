"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
  return (
    <motion.footer 
      className="relative mt-10 flex h-16 w-full flex-row items-center justify-center overflow-hidden bg-background/60 px-4 text-foreground backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      </div>
      
      <div className="z-10 flex flex-row items-baseline gap-3 text-base">
        <motion.p 
          className="font-bold dark:text-primary"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="https://dyczkowski.dev" className="hover:underline">
            dyczkowski.dev
          </Link>
        </motion.p>
        <p className="text-sm text-muted-foreground">All rights reserved.</p>
      </div>
    </motion.footer>
  );
};
