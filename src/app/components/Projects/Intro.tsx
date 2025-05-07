"use client";

import { ElementReveal } from "../Misc/ElementReveal";
import { useTranslation } from "../../internationalization/useTranslation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Intro() {
  const [translate] = useTranslation();
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true });

  return (
    <div className="flex h-fit w-full flex-col justify-start py-12 md:sticky md:top-0 md:h-screen">
      <ElementReveal color="bg-secondary">
        <h2 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 mt-2 leading-tight text-secondary">
        <span className="text-pink-500 mr-2">{`//`}</span>
        {translate(
            "Pixels, Paths & Protocols Turning Ideas Into Interfaces",
            "introSectionHeading"
          )}
        </h2>
      </ElementReveal>
      <motion.p
        ref={introRef}
        initial={{ opacity: 0, y: 20 }}
        animate={introInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="text-md md:text-lg 2xl:text-4xl text-white mb-1 2xl:mb-6"
      >
        {translate(
          "Over the past four years, I’ve crafted applications that blend elegant UIs with solid architecture — from movie platforms and no-code tools to decentralized card games and museum installations.",
          "introSectionParagraph1"
        )}
      </motion.p>

      <motion.p
        ref={introRef}
        initial={{ opacity: 0, y: 20 }}
        animate={introInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="text-md md:text-lg 2xl:text-4xl text-white mb-1 2xl:mb-6"
      >
        {translate(
          "Whether I’m building a knowledge-aware email interface powered by AI, designing a smooth editing experience inside a no-code CMS, or creating interactive exhibits for a museum, I’m driven by a passion for clear logic, performant code, and human-centered design.",
          "introSectionParagraph2"
        )}
      </motion.p>

      <motion.p
        ref={introRef}
        initial={{ opacity: 0, y: 20 }}
        animate={introInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 1.1 }}
        className="text-md md:text-lg 2xl:text-4xl text-white mb-1 2xl:mb-6"
      >
        {translate(
          "My toolkit includes modern frameworks like React, TypeScript, Next.js, and Node.js — all backed by a strong sense of UX and a mindset geared toward maintainability and scalability. I believe great software isn’t just functional — it’s intuitive, efficient, and a pleasure to use.",
          "introSectionParagraph3"
        )}
      </motion.p>
    </div>
  );
}
