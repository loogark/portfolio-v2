import { Carousel } from "./Carousel";
import { Intro } from "./Intro";

export function ProjectsSection() {
  return (
    <div className="relative mx-auto grid h-full w-full  grid-cols-1 gap-8 p-4 md:p-16 md:grid-cols-2 my-8">
      <Intro />
      <Carousel />
    </div>
  );
}
