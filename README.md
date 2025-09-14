# inDrive Geo Intelligence — Hackathon Prototype

Monorepo: backend (FastAPI) + frontend (Vite + React + MapLibre).
We turn anonymized trip geotracks into product value for passenger, driver, and ops:
demand heatmaps, bottlenecks, anomalies/risk zones, popular OD corridors, and Comfort/Eco
indices. This README is plain text (no Markdown) so formulas copy correctly.

---

## ARCHITECTURE AND STRUCTURE

indrive-geo/
backend/ FastAPI: serves aggregated JSON/GeoJSON layers
app/
main.py
data/ Prepared artifacts (aggregates)
heat_grid_astana.json
low_speed_points.geojson
anomalies_segments.geojson
risk_zones.geojson
od_routes.geojson
comfort_by_trip.json
eco_metrics_by_trip.json
requirements.txt
README.md Local backend README
frontend/ Vite + React + react-map-gl/maplibre + SWR
src/
components/ Passenger / Driver / Ops screens + Map component
lib/api.ts Simple REST client
package.json
vite.config.ts
index.html
README.txt This file (root, plain text)
.gitignore

Data prep (offline) -> backend serves aggregates -> frontend visualizes and UX signals.

---

## QUICK START

1. Backend (FastAPI)
   cd backend
   python -m venv .venv
   Windows: .venv\Scripts\activate
   macOS/Linux: source .venv/bin/activate
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload --port 8000
   Check: http://localhost:8000/health -> {"ok": true}

2. Frontend (Vite + React)
   cd frontend
   npm i
   Set API base:
   Windows PowerShell:
   echo VITE_API_BASE=http://localhost:8000 > .env
   macOS/Linux:
   echo "VITE_API_BASE=http://localhost:8000" > .env
   npm run dev
   Open: http://localhost:3000/

---

## ENVIRONMENT REQUIREMENTS

- Python 3.10/3.11+
- Node.js 18/20+ (20 LTS recommended)
- OS: Windows/macOS/Linux
- RAM: 4–8 GB (aggregates are light; raw dataset can be heavy)
- Internet for base map tiles (Carto Positron GL style)

---

## CONFIGURATION / ENV VARS

Frontend

- VITE_API_BASE Base URL of backend (default http://localhost:8000)

Backend

- No env vars required (static artifacts in backend/data).

---

## API ENDPOINTS AND DATA FORMATS

All responses are JSON.

GET /health

- Liveness check.

GET /heat

- Demand heat grid (~100–110 m bins).
- Format: array of objects:
  [{ lat_bin: number, lon_bin: number, count: number }, ...]

GET /low-speed?limit=20000

- Bottlenecks (speed <= 5 km/h). GeoJSON FeatureCollection (Point).
- properties: speed_kmh (number).
- "limit" trims features for faster rendering.

GET /anomalies?limit=20000

- Baseline anomalies: sharp turns or speed jumps. GeoJSON (Point).
- properties:
  trip (number), dspeed (abs delta speed, km/h), dazimuth (delta course, degrees),
  speed_kmh (km/h).

GET /risk-zones?limit=500

- Top grid cells by risk_ratio = anomalies_count / points_count (bin ~0.003 degrees).
- GeoJSON (Point).
- properties: risk_ratio (0..1), points, anomalies.

GET /routes?limit=2000

- Popular OD corridors (start bin -> end bin). GeoJSON (LineString).
- properties: count (weight of flow).

GET /comfort?skip=0&limit=1000&sort_by=comfort_score&desc=true

- Comfort index per trip (0..100).
- fields: randomized_id, points, total_m, comfort_score, low_speed_ratio,
  mean_dspeed, p95_dspeed, mean_dazimuth.

GET /eco?skip=0&limit=1000&sort_by=extra_co2_kg&desc=true

- Eco metrics per trip.
- fields: randomized_id, total_km, congestion_km, avg_speed_kmh,
  extra_fuel_l, extra_co2_kg.

---

## ALGORITHMS AND METRICS (MATH)

Distances (Haversine, meters)

- R = 6,371,000
- a = sin^2(dphi/2) + cos(phi1) _ cos(phi2) _ sin^2(dlambda/2)
- c = 2 \* atan2(sqrt(a), sqrt(1 - a))
- d = R \* c
  where phi, lambda are radians.

Bottlenecks (low speed)

- low_speed if speed_kmh <= 5

Baseline anomalies (rule-based)

- speed jump: abs(delta speed_kmh) >= 30
- sharp turn: delta course >= 60 degrees
  delta course computed on a circle in [0..180]:
  d = abs(a - b) mod 360; delta = min(d, 360 - d)

Risk zones

- Grid ~0.003 degrees (about 330 m).
- risk_ratio = anomalies_count / points_count
- Keep cells with points_count >= 50, then take top by risk_ratio.

OD corridors (popular routes)

- For each trip take start and end point.
- Bin start/end to ~0.003 degrees, group by (s_bin, e_bin), count flows.
- Render top-K flows as LineString with width proportional to count.

Comfort index (0..100)

- Trip features:
  p95_dspeed = 95th percentile of abs(delta speed_kmh)
  mean_dazimuth = mean delta course (degrees)
  low_speed_ratio = share of points with speed_kmh <= 5
- Robust normalization per feature by 10th/90th percentiles into [0..1].
- Penalty = 0.4 _ p95_dspeed_norm + 0.3 _ mean_dazimuth_norm + 0.3 \* low_speed_ratio_norm
- comfort_score = (1 - Penalty) \* 100, clipped to [0..100].

Eco metrics

- congestion_km = sum of segment_m where speed_kmh < 10, divided by 1000
- extra_fuel_l approx = 0.3 \* congestion_km (liters per km in congestion)
- extra_co2_kg = extra_fuel_l \* 2.31

ML role (current and next)

- Current: feature engineering + statistical rules + composite indices (fast, reproducible baseline).
- Next steps: route clustering (DBSCAN/HDBSCAN), short-term demand forecast (Prophet/XGBoost),
  learned anomaly detection (Isolation Forest / One-Class SVM), comfort calibration using ratings.

---

## LIMITATIONS AND ASSUMPTIONS

- Anonymity: IDs are randomized; no personal data.
- Order within trips: if timestamps are missing, we assume row order equals event order.
- Thresholds: 5 km/h, 30 km/h, 60 degrees are baseline and need tuning for city/season.
- Aggregates vs raw: repository ships aggregated/anonymous JSON/GeoJSON, not raw tracks.
- Performance: endpoints return samples/top-K for smooth rendering.
- Security: demo API has no auth; add auth/rate-limit/CORS before production.

---

## DATA LICENSES AND PRIVACY

- Data source: anonymized trip geotracks provided for the inDrive hackathon.
- Permission: use is limited to hackathon/demo/evaluation of this prototype.
- Re-publishing the raw dataset is prohibited.
- Repository contains only aggregated/anonymous artifacts in backend/data that do not allow
  reconstruction of personal information.
- Takedown: upon request from organizers/rightsholder, aggregates can be removed.
- No de-anonymization mechanics are present; all computations operate on grid/cluster/aggregate level.
- If an official data license text is provided by organizers, include it in backend/README.md
  and link it from this file.

---

## TROUBLESHOOTING

- Uvicorn not found on Windows:
  python -m uvicorn app.main:app --reload --port 8000
  Ensure venv is active: .\.venv\Scripts\Activate.ps1

- ModuleNotFoundError: app
  Run from backend/ root, or specify app dir:
  python -m uvicorn --app-dir ./ app.main:app --reload

- Frontend map not loading
  Check .env (VITE_API_BASE), that /health works, and internet for tiles.
  Use named imports from react-map-gl/maplibre (Map, Source, Layer, NavigationControl).

- Buttons do not navigate
  Ensure react-router-dom is installed and BrowserRouter wraps <App />.

---

## ROADMAP

- /incentives Dynamic bonus zones from demand/supply imbalance.
- /forecast One-hour demand forecast (Prophet/XGBoost).
- Risk zones polygons (iso-density smoothing) and legend in UI.
- Route clustering (DBSCAN/HDBSCAN) replacing coarse grid OD.
- Auth, rate limits, observability (logs, Prometheus/Grafana).

---

## CODE LICENSE

- Code: MIT (or specify another OSI license if required).
- Data: see "Data licenses and privacy" section above.
