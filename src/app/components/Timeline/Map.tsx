"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MapProps {
  onMapReady?: (map: mapboxgl.Map) => void;
}

export function Map({ onMapReady }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [70.619, 25.125],
      style: "mapbox://styles/mapbox/standard",
      zoom: 0.8,
      interactive: false,
      attributionControl: false,
    });

    map.on("load", () => {
      onMapReady?.(map);
    });

    return () => map.remove();
  }, [onMapReady]);

  return <div ref={mapContainerRef} className="w-full h-full rounded-xl" />;
}
