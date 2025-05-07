// components/StackSection.tsx
"use client";

import { useRef } from "react";
import { useTranslation } from "../../internationalization/useTranslation";
import { ElementReveal } from "../Misc/ElementReveal";
import { StackDescription } from "./StackDescription";
import { AnimatedTechDiagram } from "./TechStack";
import { motion, useInView } from "framer-motion";

export function StackSection() {
  const [translate] = useTranslation();
  const stackRef = useRef(null);
  const stackInView = useInView(stackRef, { once: true });

  return (
    <section className="h-fit md:h-screen bg-primary  text-white p-4 md:p-16 my-8">
      <ElementReveal color="bg-secondary">
        <h2 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-8 leading-tight text-secondary">
        <span className="text-pink-500 mr-2">{`//`}</span>
        {translate("The Stack Behind the Magic", "stackHeading")}
        </h2>
      </ElementReveal>

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
        <div className="w-full lg:w-1/2">
          <StackDescription />
        </div>
        <motion.div
          ref={stackRef}
          initial={{ opacity: 0, y: 30 }}
          animate={stackInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="w-full  md:w-1/2 scale-[1] 2xl:scale-150"
        >
          <AnimatedTechDiagram />
        </motion.div>
      </div>
    </section>
  );
}
