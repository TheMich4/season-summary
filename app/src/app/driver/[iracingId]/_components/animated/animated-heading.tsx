"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./animated-section";

export const AnimatedHeading = () => {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const title = "Season Stats";
  const titleWords = title.split(" ");

  return (
    <AnimatedSection className="mb-8 flex flex-col items-center gap-2 text-center" delay={0}>
      <motion.h1 
        className="flex flex-wrap justify-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        {titleWords.map((word, i) => (
          <motion.span 
            key={i} 
            className={i === 0 ? "text-primary mr-3" : ""}
            variants={letterVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
      
      <motion.p 
        className="max-w-md text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Your comprehensive iRacing performance analysis and statistics dashboard
      </motion.p>
    </AnimatedSection>
  );
}; 