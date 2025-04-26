"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useTranslation } from "../../internationalization/useTranslation";
import { ProjectType } from "./data";

interface CarouselItemProps {
  scrollYProgress: MotionValue<number>;
  position: number;
  numItems: number;
  project: ProjectType;
}

export const CarouselItem = ({
  scrollYProgress,
  position,
  numItems,
  project,
}: CarouselItemProps) => {
  const [translate] = useTranslation();

  const stepSize = 1 / numItems;
  const end = stepSize * position;
  const start = end - stepSize;

  const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.75]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="overflow-hidden shadow-2xl rounded-2xl bg-neutral-900 "
    >
      <div className="relative aspect-video w-full">
        {project.live ? (
          <iframe
            src={project.live}
            title={translate(project.titleFallback, project.titleKey)}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        ) : (
          <img
            src={project.src}
            alt={translate(project.titleFallback, project.titleKey)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      <div className="p-6 space-y-2">
        <h3 className="text-2xl font-semibold text-white">
          {translate(project.titleFallback, project.titleKey)}
        </h3>
        <p className="text-neutral-300 inline-block">
          {translate(project.descriptionFallback, project.descriptionKey)}
          {(project.live || project.github) && (
            <span className="ml-2 text-sm underline underline-offset-2 font-bold">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-[0.80] transition"
                >
                  {translate("Live", "linkLive")}
                </a>
              )}
              {project.live && project.github && (
                <span className="mx-2">|</span>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-[0.80] transition"
                >
                  {translate("GitHub", "linkGitHub")}
                </a>
              )}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
};
