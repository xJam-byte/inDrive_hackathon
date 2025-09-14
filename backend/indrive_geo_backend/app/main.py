from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os, orjson

APP_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(os.path.dirname(APP_DIR), "data")

def read_json(path: str):
    with open(path, "rb") as f:
        return orjson.loads(f.read())

app = FastAPI(title="inDrive Geo Intelligence API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"ok": True}

@app.get("/heat")
async def heat():
    path = os.path.join(DATA_DIR, "heat_grid_astana.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="heat data missing")
    return read_json(path)

@app.get("/low-speed")
async def low_speed(limit: int = Query(default=20000, ge=1, le=20000)):
    path = os.path.join(DATA_DIR, "low_speed_points.geojson")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="low-speed data missing")
    data = read_json(path)
    if isinstance(data, dict) and "features" in data and isinstance(data["features"], list):
        data["features"] = data["features"][:limit]
    return data

@app.get("/anomalies")
async def anomalies(limit: int = Query(default=20000, ge=1, le=20000)):
    path = os.path.join(DATA_DIR, "anomalies_segments.geojson")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="anomalies data missing")
    data = read_json(path)
    if isinstance(data, dict) and "features" in data and isinstance(data["features"], list):
        data["features"] = data["features"][:limit]
    return data

@app.get("/comfort")
async def comfort(skip: int = 0, limit: int = Query(default=1000, ge=1, le=5000), sort_by: str = "comfort_score", desc: bool = True):
    path = os.path.join(DATA_DIR, "comfort_by_trip.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="comfort data missing")
    data = read_json(path)
    if isinstance(data, list) and sort_by:
        try:
            data = sorted(data, key=lambda x: x.get(sort_by, 0), reverse=desc)
        except Exception:
            pass
    end = min(len(data), skip + limit)
    return {"total": len(data), "items": data[skip:end], "skip": skip, "limit": limit}

@app.get("/eco")
async def eco(skip: int = 0, limit: int = Query(default=1000, ge=1, le=5000), sort_by: str = "extra_co2_kg", desc: bool = True):
    path = os.path.join(DATA_DIR, "eco_metrics_by_trip.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="eco data missing")
    data = read_json(path)
    if isinstance(data, list) and sort_by:
        try:
            data = sorted(data, key=lambda x: x.get(sort_by, 0), reverse=desc)
        except Exception:
            pass
    end = min(len(data), skip + limit)
    return {"total": len(data), "items": data[skip:end], "skip": skip, "limit": limit}

@app.get("/routes")
async def routes(limit: int = Query(default=2000, ge=1, le=5000)):
    path = os.path.join(DATA_DIR, "od_routes.geojson")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="routes data missing")
    data = read_json(path)
    if isinstance(data, dict) and "features" in data and isinstance(data["features"], list):
        data["features"] = data["features"][:limit]
    return data

@app.get("/risk-zones")
async def risk_zones(limit: int = Query(default=500, ge=1, le=1000)):
    path = os.path.join(DATA_DIR, "risk_zones.geojson")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="risk zones data missing")
    data = read_json(path)
    if isinstance(data, dict) and "features" in data and isinstance(data["features"], list):
        data["features"] = data["features"][:limit]
    return data
