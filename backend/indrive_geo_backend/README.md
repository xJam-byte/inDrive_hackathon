# inDrive Geo Intelligence — Python Backend

## Quickstart
```bash
cd indrive_geo_backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints
- GET /health
- GET /heat                # heat grid JSON
- GET /low-speed?limit=10000
- GET /anomalies?limit=15000
- GET /comfort?skip=0&limit=1000&sort_by=comfort_score&desc=true
- GET /eco?skip=0&limit=1000&sort_by=extra_co2_kg&desc=true
```
