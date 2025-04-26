"use client";

import { useRef } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import { PROJECTS } from "./data";
import { CarouselItem } from "./CarouselItem";

export function Carousel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true });

  return (
    <motion.div
      ref={listRef}
      initial={{ opacity: 0 }}
      animate={listInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 1 }}
      className="relative w-full"
    >
      <Gradient />
      <div ref={ref} className="relative z-0 flex flex-col gap-6 md:gap-12">
        {PROJECTS.map((project, index) => (
          <CarouselItem
            key={index}
            scrollYProgress={scrollYProgress}
            position={index + 1}
            numItems={PROJECTS.length}
            project={project}
          />
        ))}
      </div>
      <Buffer />
    </motion.div>
  );
}

const Gradient = () => (
  <div className="sticky top-0 z-10 hidden h-24 w-full md:block" />
);

const Buffer = () => <div className="h-24 w-full md:h-48" />;
