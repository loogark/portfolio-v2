import {
  Hero,
  StackSection,
  ProjectsSection,
  ContactSection,
  TimelineSection,
} from "./components";
import { Footer } from "./components/Footer/Footer";

import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  return (
    <div className="relative w-full h-full">
      <Hero />
      <TimelineSection />  
      <ProjectsSection />
     
      <StackSection />
      
      <ContactSection />
     
      <Footer />
    </div>
  );
}
