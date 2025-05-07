"use client";

import { motion, useInView } from "framer-motion";
import { ElementReveal } from "../Misc/ElementReveal";
import { InteractiveStory } from "./InteractiveStory";
import { useTranslation } from "../../internationalization/useTranslation";
import { useRef } from "react";

export function TimelineSection() {
  const [translate] = useTranslation();

  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true });

  return (
    <section className="h-fit md:h-screen p-4 md:p-16 my-8 bg-primary">
      <ElementReveal color="bg-secondary">
        <h2 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 mt-2 leading-tight text-secondary">
        <span className="text-pink-500 mr-2">{`//`}</span>
        {translate(
            `Plot Twists from My Life’s Source Code`,
            "timelineHeading"
          )}
        </h2>
      </ElementReveal>

      <motion.div
        ref={storyRef}
        initial={{ opacity: 0, y: 30 }}
        animate={storyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-5xl 2xl:max-w-8/12 flex items-center justify-center m-auto h-[550px] 2xl:h-[850px] mt-12"
      >
        <InteractiveStory />
      </motion.div>
    </section>
  );
}
