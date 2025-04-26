// src/data/projects.ts
import type { LangKeys, Dictionaries } from "../../internationalization";
export interface ProjectType {
  src?: string;
  live?: string;
  github?: string;
  titleKey: keyof Dictionaries[LangKeys];
  titleFallback: string;
  descriptionKey: keyof Dictionaries[LangKeys];
  descriptionFallback: string;
}

export const PROJECTS: ProjectType[] = [
  {
    titleKey: "projectZestTitle",
    titleFallback: "Zest | AI-powered Email Client",
    descriptionKey: "projectZestDescription",
    descriptionFallback:
      "Built a smart email interface that labels and threads conversations contextually. Used ProseMirror for rich text and React/Node.js.",
    live: "https://www.zest.email/",
  },
  {
    titleKey: "projectMuseumTitle",
    titleFallback: "Museum Apps | Pathfinder & Lineage Discovery",
    descriptionKey: "projectMuseumDescription",
    descriptionFallback:
      "Created interactive tools and kid-friendly games for a Parisian museum. Built using React, Leaflet and D3.",
    live: "https://saint-denis.vercel.app/",
  },
  {
    titleKey: "projectAvacardsTitle",
    titleFallback: "Avacards",
    descriptionKey: "projectAvacardsDescription",
    descriptionFallback:
      "A decentralized app on Avalanche blockchain with 100 unique cards that users can trade, customize and showcase.",
    live: "https://www.avacards.xyz",
  },
  {
    titleKey: "projectCatherineTitle",
    titleFallback: "Catherine Manikham | Naturopathe Website",
    descriptionKey: "projectCatherineDescription",
    descriptionFallback:
      "Practice website for a Naturopathic physician built using Next.js, Notion API, and Chakra UI. Features SEO and email booking.",
    live: "https://www.cmanikham-naturopathe.fr/",
    github: "https://github.com/cathi-manikham/naturopathie",
  },
  {
    titleKey: "projectThiraiTitle",
    titleFallback: "Thirai",
    descriptionKey: "projectThiraiDescription",
    descriptionFallback:
      "A movie discovery platform built with React, TypeScript, Node.js, MongoDB and TMDB API. Includes real-time content and search.",
    live: "https://thirai.vercel.app",
    github: "https://github.com/loogark/thirai",
  },
  {
    titleKey: "projectTechiesBlogTitle",
    titleFallback: "Techies Blog",
    descriptionKey: "projectTechiesBlogDescription",
    descriptionFallback:
      "Modern developer blog using a headless CMS with GraphCMS, GraphQL, and Next.js. Fully responsive and SEO optimized.",
    live: "https://techies-blog.vercel.app",
    github: "https://github.com/loogark/techies_blog",
  },
  {
    titleKey: "projectTechiesTitle",
    titleFallback: "Techies",
    descriptionKey: "projectTechiesDescription",
    descriptionFallback:
      "A social platform for developers using MERN stack. Enables users to share thoughts, comment, and connect with peers.",
    src: "/images/tech.png",
    github: "https://github.com/loogark/techies",
  },
  {
    titleKey: "projectSpotifyCloneTitle",
    titleFallback: "React Spotify Clone",
    descriptionKey: "projectSpotifyCloneDescription",
    descriptionFallback:
      "A full-stack Spotify web app clone built with React, Bootstrap, Node.js and Spotify Web API.",
    src: "/images/spotify.jpeg",
    github: "https://github.com/loogark/spotify-react",
  },
];
