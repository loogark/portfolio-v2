import * as turf from "@turf/turf";
import { FeatureCollection, LineString, Point } from "geojson";

// Type alias for coordinates
type Coordinate = [number, number];

export const animateFlightPath = (
  from: Coordinate,
  to: Coordinate,
  onComplete: () => void,
  map: mapboxgl.Map
): void => {
  if (!map || !map.isStyleLoaded()) {
    map.once("idle", () => animateFlightPath(from, to, onComplete, map));
    return;
  }

  const steps = 300;

  // Create a curved line between from and to using bezier spline
  const baseLine = turf.lineString([from, to]);
  const curved = turf.bezierSpline(baseLine, { sharpness: 0.85 });

  const arc: Coordinate[] = [];
  const lineDistance = turf.length(curved);

  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(curved, i);
    arc.push(segment.geometry.coordinates as Coordinate);
  }

  if (arc.length < 2) {
    console.warn("Flight path arc is too short or invalid.");
    arc.push(from, to);
  }

  // Clean up any existing layers and sources
  if (map.getSource("flight-route")) {
    map.removeLayer("flight-route");
    map.removeSource("flight-route");
  }
  if (map.getSource("flight-point")) {
    map.removeLayer("flight-point");
    map.removeSource("flight-point");
  }

  // Create emoji marker as canvas
  const emoji = "✈️";
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 32, 32);

  createImageBitmap(canvas).then((bitmap) => {
    if (map.hasImage("plane")) map.removeImage("plane");
    map.addImage("plane", bitmap, { pixelRatio: 2 });

    const point: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: from,
          },
        },
      ],
    };

    const trailRoute: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [],
          },
          properties: {},
        },
      ],
    };

    map.addSource("flight-route", {
      type: "geojson",
      data: trailRoute,
    });

    map.addSource("flight-point", {
      type: "geojson",
      data: point,
    });

    map.addLayer({
      id: "flight-route",
      source: "flight-route",
      type: "line",
      paint: {
        "line-color": "#4831d4",
        "line-width": 3,
        "line-opacity": 0.85,
        "line-dasharray": [1, 1],
      },
    });

    map.addLayer({
      id: "flight-point",
      source: "flight-point",
      type: "symbol",
      layout: {
        "icon-image": "plane",
        "icon-size": 3,
        "icon-rotate": ["get", "bearing"],
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
      },
    });

    let counter = 0;

    const animate = () => {
      if (counter >= steps) {
        map.removeLayer("flight-point");
        map.removeSource("flight-point");
        map.removeLayer("flight-route");
        map.removeSource("flight-route");
        onComplete();
        return;
      }

      const start = arc[counter];
      const end = arc[counter + 1] ?? start;

      point.features[0].geometry.coordinates = start;
      point.features[0].properties = {
        bearing: turf.bearing(turf.point(start), turf.point(end)),
      };

      trailRoute.features[0].geometry.coordinates.push(start);

      const pointSource = map.getSource(
        "flight-point"
      ) as mapboxgl.GeoJSONSource;
      const routeSource = map.getSource(
        "flight-route"
      ) as mapboxgl.GeoJSONSource;

      if (pointSource) pointSource.setData(point);
      if (routeSource) routeSource.setData(trailRoute);

      map.easeTo({
        center: start,
        zoom: 4,
        duration: 50,
        easing: (t) => t,
      });

      counter++;
      requestAnimationFrame(animate);
    };

    animate();
  });
};
