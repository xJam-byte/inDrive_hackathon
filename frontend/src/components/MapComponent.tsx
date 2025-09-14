import React, { useMemo } from "react";
import useSWR from "swr";
import { Map, Source, Layer, NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { j, heatToGeoJSON } from "../lib/api";

export interface MapLayerData {
  heatmap: boolean;
  lowSpeed: boolean;
  routes: boolean;
  anomalies: boolean;
  risk: boolean;
  incentives: boolean; // пока заглушка
}

interface MapComponentProps {
  layers: MapLayerData;
  className?: string;
  children?: React.ReactNode;
}

const STYLE_URL =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const INITIAL = { longitude: 71.427, latitude: 51.097, zoom: 12.2 };

export function MapComponent({
  layers,
  className,
  children,
}: MapComponentProps) {
  // --- загрузка данных ---
  const { data: heatRows } = useSWR(layers.heatmap ? "/heat" : null, (p) =>
    j(p)
  );
  const { data: lowSpeed } = useSWR(
    layers.lowSpeed ? "/low-speed" : null,
    (p) => j(p)
  );
  const { data: routes } = useSWR(
    layers.routes ? "/routes?limit=2000" : null,
    (p) => j(p)
  );
  const { data: anomalies } = useSWR(
    layers.anomalies ? "/anomalies?limit=20000" : null,
    (p) => j(p)
  );
  const { data: risk } = useSWR(
    layers.risk ? "/risk-zones?limit=500" : null,
    (p) => j(p)
  );
  // incentives можно позже сделать как отдельный эндпоинт

  const heatGeo = useMemo(
    () => (heatRows ? heatToGeoJSON(heatRows) : null),
    [heatRows]
  );

  // --- стили слоёв ---
  const heatLayer: any = {
    id: "heat",
    type: "heatmap",
    paint: {
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "count"],
        0,
        0,
        200,
        1,
      ],
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        0.6,
        14,
        1.2,
      ],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 10, 15, 14, 35],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(0,0,0,0)",
        0.2,
        "#a3e635", // зеленый
        0.5,
        "#facc15", // желтый
        0.8,
        "#fb923c", // оранжевый
        1.0,
        "#ef4444", // красный
      ],
    },
  };

  const lowSpeedLayer: any = {
    id: "low-speed",
    type: "circle",
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 2, 15, 6],
      "circle-color": "#FFA500",
      "circle-opacity": 0.85,
    },
  };

  const anomaliesLayer: any = {
    id: "anomalies",
    type: "circle",
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 2, 15, 5],
      "circle-color": "#7E57C2",
      "circle-opacity": 0.85,
    },
  };

  const riskLayer: any = {
    id: "risk",
    type: "circle",
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 2.5, 15, 7],
      "circle-color": "#FF6B6B",
      "circle-opacity": [
        "interpolate",
        ["linear"],
        ["get", "risk_ratio"],
        0.05,
        0.35,
        0.2,
        0.6,
        0.4,
        0.9,
      ],
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 0.5,
    },
  };

  const routesLayer: any = {
    id: "routes",
    type: "line",
    paint: {
      "line-color": "#2B7BFF",
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        ["interpolate", ["linear"], ["get", "count"], 50, 1, 500, 5],
        14,
        ["interpolate", ["linear"], ["get", "count"], 50, 2, 500, 8],
      ],
      "line-opacity": 0.9,
    },
    layout: { "line-cap": "round", "line-join": "round" },
  };

  return (
    <div className={className}>
      <Map
        mapLib={maplibregl}
        mapStyle={STYLE_URL}
        initialViewState={INITIAL}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-left" />

        {layers.heatmap && heatGeo && (
          <Source id="heat-src" type="geojson" data={heatGeo as any}>
            <Layer {...heatLayer} />
          </Source>
        )}

        {layers.lowSpeed && lowSpeed && (
          <Source id="low-src" type="geojson" data={lowSpeed as any}>
            <Layer {...lowSpeedLayer} />
          </Source>
        )}

        {layers.anomalies && anomalies && (
          <Source id="anom-src" type="geojson" data={anomalies as any}>
            <Layer {...anomaliesLayer} />
          </Source>
        )}

        {layers.risk && risk && (
          <Source id="risk-src" type="geojson" data={risk as any}>
            <Layer {...riskLayer} />
          </Source>
        )}

        {layers.routes && routes && (
          <Source id="routes-src" type="geojson" data={routes as any}>
            <Layer {...routesLayer} />
          </Source>
        )}

        {children /* ваши подсказки/баннеры поверх карты */}
      </Map>
    </div>
  );
}
