/// <reference types="vite/client" />

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function j<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

/** heat_grid_astana.json -> GeoJSON Points */
export function heatToGeoJSON(
  rows: { lat_bin: number; lon_bin: number; count: number }[]
) {
  return {
    type: "FeatureCollection",
    features: rows.map((r) => ({
      type: "Feature",
      properties: { count: r.count },
      geometry: { type: "Point", coordinates: [r.lon_bin, r.lat_bin] },
    })),
  } as const;
}
