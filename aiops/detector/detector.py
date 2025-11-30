import os
import time
import json
from datetime import datetime, timedelta, timezone
from typing import List, Optional

import numpy as np
import requests
from sklearn.ensemble import IsolationForest


def get_env(name: str, default: Optional[str] = None) -> str:
    value = os.getenv(name, default)
    if value is None:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


PROMETHEUS_URL = get_env("PROMETHEUS_URL", "http://prometheus-k8s.observability.svc.cluster.local:9090")
# Example PromQL: histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket{job=\"web\"}[5m])) by (le))
PROM_QUERY = get_env("PROM_QUERY", "rate(http_request_duration_seconds_sum[1m]) / rate(http_request_duration_seconds_count[1m])")
ALERT_WEBHOOK = os.getenv("ALERT_WEBHOOK")  # Slack/Teams/Webhook receiver (POST JSON)
WINDOW_MINUTES = int(os.getenv("WINDOW_MINUTES", "120"))
STEP = os.getenv("STEP", "60s")
SLEEP_SECONDS = int(os.getenv("SLEEP_SECONDS", "60"))
CONTAMINATION = float(os.getenv("CONTAMINATION", "0.05"))
MIN_POINTS = int(os.getenv("MIN_POINTS", "30"))
MODEL_SEED = int(os.getenv("MODEL_SEED", "42"))
TIMEOUT_SECONDS = int(os.getenv("TIMEOUT_SECONDS", "20"))


def fetch_timeseries(prom_url: str, query: str, window_minutes: int, step: str) -> List[float]:
    now = datetime.now(timezone.utc)
    start = now - timedelta(minutes=window_minutes)
    params = {
        "query": query,
        "start": int(start.timestamp()),
        "end": int(now.timestamp()),
        "step": step,
    }
    resp = requests.get(f"{prom_url}/api/v1/query_range", params=params, timeout=TIMEOUT_SECONDS)
    resp.raise_for_status()
    payload = resp.json()
    if payload.get("status") != "success":
        raise RuntimeError(f"Prometheus error: {payload}")
    result = payload.get("data", {}).get("result", [])
    if not result:
        return []
    # Use first series; for multiple, you may aggregate externally in PromQL
    values = result[0].get("values", [])
    series = [float(v[1]) for v in values]
    return series


def detect_anomalies(series: List[float], contamination: float, min_points: int, seed: int) -> List[int]:
    if len(series) < min_points:
        return []
    x = np.array(series, dtype=float).reshape(-1, 1)
    model = IsolationForest(contamination=contamination, random_state=seed)
    preds = model.fit_predict(x)  # -1 = anomaly
    anomalies = [i for i, p in enumerate(preds) if p == -1]
    return anomalies


def post_webhook(url: str, body: dict) -> None:
    headers = {"Content-Type": "application/json"}
    try:
        requests.post(url, headers=headers, data=json.dumps(body), timeout=TIMEOUT_SECONDS)
    except Exception as exc:  # best-effort; do not crash loop on notify failure
        print(f"notify error: {exc}", flush=True)


def summarize(series: List[float]) -> dict:
    if not series:
        return {"count": 0}
    arr = np.array(series, dtype=float)
    return {
        "count": int(arr.size),
        "last": float(arr[-1]),
        "p50": float(np.percentile(arr, 50)),
        "p90": float(np.percentile(arr, 90)),
        "p95": float(np.percentile(arr, 95)),
        "mean": float(arr.mean()),
    }


def main() -> None:
    print("AIOps metrics anomaly detector starting...", flush=True)
    print(f"Prometheus: {PROMETHEUS_URL}", flush=True)
    print(f"Query: {PROM_QUERY}", flush=True)
    while True:
        try:
            series = fetch_timeseries(PROMETHEUS_URL, PROM_QUERY, WINDOW_MINUTES, STEP)
            stats = summarize(series)
            anomalies = detect_anomalies(series, CONTAMINATION, MIN_POINTS, MODEL_SEED)
            has_anomaly = len(anomalies) > 0
            print(json.dumps({
                "ts": datetime.now(timezone.utc).isoformat(),
                "points": stats.get("count", 0),
                "last": stats.get("last"),
                "has_anomaly": has_anomaly,
                "num_anomalies": len(anomalies),
            }), flush=True)

            if has_anomaly and ALERT_WEBHOOK:
                body = {
                    "title": "AIOps Alert: Metric anomaly detected",
                    "severity": "warning",
                    "source": "aiops-metrics-detector",
                    "promql": PROM_QUERY,
                    "window_minutes": WINDOW_MINUTES,
                    "contamination": CONTAMINATION,
                    "stats": stats,
                    "num_anomalies": len(anomalies),
                }
                post_webhook(ALERT_WEBHOOK, body)
        except Exception as exc:
            print(f"detector error: {exc}", flush=True)

        time.sleep(SLEEP_SECONDS)


if __name__ == "__main__":
    main()


