"use client";

import { useRef } from "react";
import { ElementReveal } from "../Misc/ElementReveal";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalBody } from "./TerminalBody";
import { useTranslation } from "../../internationalization/useTranslation";
import { motion, useInView } from "framer-motion";

export const ContactSection = () => {
  const [translate] = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true });

  return (
    <section className="h-fit md:h-screen p-4 md:p-16 bg-primary my-8">
      <ElementReveal color="bg-secondary">
        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-secondary">
          <span className="text-pink-500">//</span>{" "}
          {translate(
            "Talk to me, human 🤖 or risk being assimilated",
            "contactHeading"
          )}
        </h2>
      </ElementReveal>

      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 30 }}
        animate={formInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col justify-center h-fit px-0 md:px-4 my-14"
      >
        <div className="w-full sm:w-auto mx-auto p-2 sm:p-4 bg-secondary rounded-xl shadow-2xl">
          <div
            ref={containerRef}
            onClick={() => inputRef.current?.focus()}
            className="
              w-full max-w-full sm:max-w-3xl 
              h-64 sm:h-96 
              bg-slate-950 backdrop-blur rounded-lg 
              overflow-y-scroll shadow-xl cursor-text font-mono
            "
          >
            <TerminalHeader />
            <TerminalBody inputRef={inputRef} containerRef={containerRef} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
