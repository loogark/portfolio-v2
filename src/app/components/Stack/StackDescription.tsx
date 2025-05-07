"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "../../internationalization/useTranslation";

export function StackDescription() {
  const [translate] = useTranslation();

  const stackDescRef = useRef(null);
  const stackDescInView = useInView(stackDescRef, { once: true });

  return (
    <div ref={stackDescRef} className="space-y-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={stackDescInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-md md:text-lg 2xl:text-3xl text-white mb-1 2xl:mb-4"
      >
        {translate(
          "I specialize in crafting dynamic, performant web applications using React, TypeScript, and Node.js. My experience spans across building rich UIs with React Query, Styled Components, and Tailwind CSS, as well as architecting scalable solutions using GraphQL, Apollo, and MongoDB.",
          "stackParagraph1"
        )}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={stackDescInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-md md:text-lg 2xl:text-3xl text-white mb-1 2xl:mb-4"
      >
        {translate(
          "I’ve worked extensively with frameworks like Next.js and Vue 3, implementing features with a strong focus on SEO, cross-browser compatibility, and accessibility. My projects often involve optimizing load performance and adopting CI/CD pipelines using tools like GitHub Actions and Docker.",
          "stackParagraph2"
        )}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={stackDescInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-md md:text-lg 2xl:text-3xl text-white mb-1 2xl:mb-4"
      >
        {translate(
          "On the design and product side, I collaborate using Figma, JIRA, and Notion, ensuring smooth handoffs and efficient development cycles. I also have experience with Flutter for mobile apps, Sass and CSS-in-JS for styling, and tools like Slate.js and Leaflet/D3 for building custom editors and interactive data visualizations.",
          "stackParagraph3"
        )}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={stackDescInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="text-md md:text-lg 2xl:text-3xl text-white mb-1"
      >
        {translate(
          "I take pride in applying test-driven development principles, leveraging Git/GitHub for version control, and staying up-to-date with modern UX and front-end practices. Whether working on decentralized apps or building SaaS platforms, I bring a full-stack mindset and strong attention to detail to every project.",
          "stackParagraph4"
        )}
      </motion.p>
    </div>
  );
}
