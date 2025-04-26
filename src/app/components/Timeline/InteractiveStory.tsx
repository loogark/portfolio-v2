"use client";

import { useRef, useState } from "react";
import { Map } from "./Map";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { scenes } from "./data";
import { FaArrowLeft, FaArrowRight, FaRedo } from "react-icons/fa";
import { animateFlightPath } from "./utils";
import { useAnimation } from "framer-motion";
import { Intro } from "./Intro";
import distance from "@turf/distance";
import { point } from "@turf/helpers";
import { Exit } from "./Exit";
import { useTranslation } from "../../internationalization/useTranslation";
import { useIsMobile } from "../../hooks";

function getDistanceInKm(a: [number, number], b: [number, number]) {
  return distance(point(a), point(b));
}

export function InteractiveStory() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const finalOverlayRef = useRef<HTMLDivElement | null>(null);
  const sceneIndexRef = useRef<number>(-1);
  const isMapReadyRef = useRef(false);
  const [showFinalOverlay, setShowFinalOverlay] = useState(false);
  const controls = useAnimation();
  const [translate] = useTranslation();
  const isMobile = useIsMobile();

  const renderPopup = (index: number) => {
    const scene = scenes[index];
    const popupContainer = document.createElement("div");

    const PopupContent = () => (
      <>
        <h2 className="text-xl font-bold mb-1">
          {translate(scene.titleFallback, scene.titleKey)}
        </h2>
        <p className="text-gray-700 mb-2">
          {translate(scene.textFallback, scene.textKey)}
        </p>
        <p className="text-xs text-gray-400 italic mb-4">
          {translate(scene.dateFallback, scene.dateKey)}
        </p>
        <div className="flex flex-row justify-around items-center gap-2">
          <button
            id="back-btn"
            disabled={index === 0}
            className="text-gray-600 cursor-pointer hover:text-black disabled:opacity-40"
          >
            <FaArrowLeft />
          </button>
          <button
            id="reset-btn"
            className="text-gray-600 cursor-pointer hover:text-black"
          >
            <FaRedo />
          </button>
          <button
            id="next-btn"
            className="text-gray-600 cursor-pointer hover:text-black"
          >
            <FaArrowRight />
          </button>
        </div>
      </>
    );

    createRoot(popupContainer).render(<PopupContent />);

    popupContainer.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const currentIndex = sceneIndexRef.current;

      if (target.closest("#back-btn") && currentIndex > 0) {
        goToScene(currentIndex - 1);
      }
      if (target.closest("#next-btn") && currentIndex < scenes.length - 1) {
        goToScene(currentIndex + 1);
      } else if (
        target.closest("#next-btn") &&
        currentIndex === scenes.length - 1
      ) {
        popupRef.current?.remove();
        markerRef.current?.remove();
        setTimeout(() => {
          setShowFinalOverlay(true);
          mapRef.current?.flyTo({
            center: [70.619, 25.125],
            zoom: 0.8,
            speed: 5,
            easing: (t) => t,
            essential: true,
          });
        }, 100);
      }
      if (target.closest("#reset-btn")) {
        popupRef.current?.remove();
        markerRef.current?.remove();
        sceneIndexRef.current = -1;
        overlayRef.current?.classList.remove("hidden");
        setShowFinalOverlay(false);
        mapRef.current?.flyTo({
          center: [70.619, 25.125],
          zoom: 0.8,
          speed: 5,
          easing: (t) => t,
          essential: true,
        });
      }
    });

    popupRef.current = new mapboxgl.Popup({
      offset: index > 4 ? (isMobile ? 10 : 40) : 60,
      closeButton: false,
      closeOnClick: false,
      focusAfterOpen: false,
      anchor: index > 4 ? (isMobile ? "top" : "left") : "bottom",
      className: "no-arrow-popup",
    })
      .setLngLat(scene.location)
      .setDOMContent(popupContainer)
      .addTo(mapRef.current!);
  };

  const goToScene = (index: number) => {
    const map = mapRef.current;
    const scene = scenes[index];
    if (!map) return;

    const prevScene = scenes[sceneIndexRef.current];
    const isFlight =
      prevScene && prevScene.country === "IN" && scene.country === "FR";

    popupRef.current?.remove();
    markerRef.current?.remove();
    sceneIndexRef.current = index;

    if (isFlight) {
      animateFlightPath(
        prevScene.location,
        scene.location,
        () => {
          goToScene(index);
        },
        mapRef.current!
      );
      return;
    }

    const prevLocation = prevScene?.location ?? scene.location;
    const km = getDistanceInKm(prevLocation, scene.location);
    const duration = Math.min(6000, Math.max(3000, km * 30));

    map.once("moveend", () => {
      const markerEl = document.createElement("div");
      markerEl.className = "marker";

      const inner = document.createElement("div");
      inner.className = "marker-icon";
      markerEl.appendChild(inner);

      const root = createRoot(inner);
      const Icon = scene.icon;
      root.render(<Icon size={28} color="white" />);

      markerRef.current = new mapboxgl.Marker({
        element: markerEl,
        anchor: "bottom",
        offset: [0, 0],
      })
        .setLngLat(scene.location)
        .addTo(map);

      setTimeout(() => {
        renderPopup(index);
      }, 400);
    });

    map.flyTo({
      center: scene.location,
      zoom: scene.zoom,
      duration,
      pitch: 74,
      bearing: 12.8,
      curve: 1.8,
      easing: (t) => t,
      essential: true,
    });
  };

  const handleReset = () => {
    popupRef.current?.remove();
    markerRef.current?.remove();
    sceneIndexRef.current = -1;
    overlayRef.current?.classList.remove("hidden");
    setShowFinalOverlay(false);
    goToScene(0);
  };

  const handleStart = () => {
    if (!isMapReadyRef.current) return;
    overlayRef.current?.classList.add("hidden");
    setShowFinalOverlay(false);
    goToScene(0);
  };

  return (
    <div className="w-full h-full m-auto">
      <div className="relative m-auto w-full h-full bg-secondary p-2 rounded-xl">
        <Map
          onMapReady={(map) => {
            mapRef.current = map;
            map.resize();
            map.setConfigProperty("basemap", "lightPreset", "dusk");
            isMapReadyRef.current = true;
          }}
        />
        <Intro onStart={handleStart} ref={overlayRef} />
        {showFinalOverlay && <Exit ref={finalOverlayRef} />}
        {showFinalOverlay && (
          <div
            className="absolute z-30 bottom-5 right-5 flex-none flex items-center justify-center w-8 h-8 ml-2 bg-white text-primary rounded-full shadow cursor-pointer"
            onClick={handleReset}
          >
            <FaRedo />
          </div>
        )}
      </div>
    </div>
  );
}
