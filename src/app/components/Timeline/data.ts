import { Dictionaries, LangKeys } from "../../internationalization";
import {
  FaBaby,
  FaSchool,
  FaUniversity,
  FaLaptopCode,
  FaRocket,
} from "react-icons/fa";


type IconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

export interface SceneDefinition {
  location: [number, number];
  zoom: number;
  modelUrl: string;
  titleKey: keyof Dictionaries[LangKeys];
  titleFallback: string;
  textKey: keyof Dictionaries[LangKeys];
  textFallback: string;
  dateKey: keyof Dictionaries[LangKeys];
  dateFallback: string;
  icon: React.ComponentType<IconProps>;
  country: string;
  minZoom: number;
  maxZoom: number;
}

export const scenes: SceneDefinition[] = [
  {
    location: [78.0894, 9.5137],
    zoom: 18.3,
    modelUrl: "/models/house.glb",
    titleKey: "sceneBirthplaceTitle",
    titleFallback: "Birthplace",
    textKey: "sceneBirthplaceText",
    textFallback:
      "I was born in southern India, a place that would later shape the beginning of my journey.",
    dateKey: "sceneBirthplaceDate",
    dateFallback: "April 1995",
    icon: FaBaby,
    country: "IN",
    minZoom: 15,
    maxZoom: 20,
  },
  {
    location: [77.83964842369971, 9.520610877081502],
    zoom: 18.3,
    modelUrl: "/models/school.glb",
    titleKey: "sceneMiddleSchoolTitle",
    titleFallback: "Middle School",
    textKey: "sceneMiddleSchoolText",
    textFallback:
      "These were formative years where I first grew curious about science and technology.",
    dateKey: "sceneMiddleSchoolDate",
    dateFallback: "2001 – 2010",
    icon: FaSchool,
    country: "IN",
    minZoom: 15,
    maxZoom: 20,
  },
  {
    location: [77.99464553564748, 9.562770405840205],
    zoom: 18.3,
    modelUrl: "/models/school.glb",
    titleKey: "sceneHighSchoolTitle",
    titleFallback: "High School",
    textKey: "sceneHighSchoolText",
    textFallback:
      "Graduated from Noble Matriculation School, laying the foundation for my tech path.",
    dateKey: "sceneHighSchoolDate",
    dateFallback: "2010 – 2012",
    icon: FaSchool,
    country: "IN",
    minZoom: 15,
    maxZoom: 20,
  },
  {
    location: [80.14094761180823, 12.907794145769328],
    zoom: 18.3,
    modelUrl: "/models/school.glb",
    titleKey: "sceneBachelorsTitle",
    titleFallback: "Bachelor's Degree",
    textKey: "sceneBachelorsText",
    textFallback:
      "Pursued my undergraduate degree in Information Technology at Bharath University.",
    dateKey: "sceneBachelorsDate",
    dateFallback: "2012 – 2016",
    icon: FaUniversity,
    country: "IN",
    minZoom: 15,
    maxZoom: 20,
  },
  {
    location: [2.3311, 48.84358],
    zoom: 18.3,
    modelUrl: "/models/school.glb",
    titleKey: "sceneMastersTitle",
    titleFallback: "Master's Program",
    textKey: "sceneMastersText",
    textFallback: "Moved to Paris to study software engineering at ISEP.",
    dateKey: "sceneMastersDate",
    dateFallback: "2017 – 2019",
    icon: FaUniversity,
    country: "FR",
    minZoom: 15,
    maxZoom: 20,
  },
  {
    location: [2.268871, 48.881745],
    zoom: 18.3,
    modelUrl: "/models/school.glb",
    titleKey: "sceneInternshipTitle",
    titleFallback: "Internship at ISEP",
    textKey: "sceneInternshipText",
    textFallback:
      "Completed a 6-month research internship during my master's in embedded development.",
    dateKey: "sceneInternshipDate",
    dateFallback: "2019",
    icon: FaUniversity,
    country: "FR",
    minZoom: 15,
    maxZoom: 20,
  },
  {
    location: [2.3465295, 48.8261178],
    zoom: 18.3,
    modelUrl: "/models/school.glb",
    titleKey: "sceneSievableTitle",
    titleFallback: "Sievable — First Job",
    textKey: "sceneSievableText",
    textFallback:
      "Joined Sievable as a Web Developer, contributing to SaaS tools and product interfaces.",
    dateKey: "sceneSievableDate",
    dateFallback: "2020 – 2021",
    icon: FaLaptopCode,
    country: "FR",
    minZoom: 15,
    maxZoom: 20,
  },
  {
    location: [2.3713, 48.8339],
    zoom: 18.3,
    modelUrl: "/models/school.glb",
    titleKey: "sceneNoticeTitle",
    titleFallback: "Notice — Front-End Developer",
    textKey: "sceneNoticeText",
    textFallback:
      "Took on a dynamic role at Notice, building engaging UI experiences and internal tools.",
    dateKey: "sceneNoticeDate",
    dateFallback: "2021 – Present",
    icon: FaRocket,
    country: "FR",
    minZoom: 15,
    maxZoom: 20,
  },
];
