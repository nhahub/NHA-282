# Metrics-based anomaly detection (Prometheus + IsolationForest)

This project detects anomalies on Prometheus metrics using IsolationForest and sends alerts to a webhook (Slack/Teams/custom).

## What’s included
- Detector code (Python): `aiops/detector/detector.py`, `requirements.txt`, `Dockerfile`
- Kubernetes manifests: `aiops/k8s/detector-deployment.yaml`, `aiops/k8s/secret-sample.yaml`
- Prometheus recording rules: `aiops/prometheus/latency-rules.yaml`


1) cluster and set context
```bash
minikube start --driver=docker
kubectl config use-context minikube
kubectl get nodes
```

2) Install Prometheus + Grafana (kube-prometheus-stack)
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade --install kube-prom-stack prometheus-community/kube-prometheus-stack \
  --namespace observability --create-namespace

kubectl -n observability get pods
```
Wait until Prometheus is Running (pod name usually: `prometheus-kube-prom-stack-kube-prome-prometheus-0`).

3) Create/update the webhook Secret
```bash
kubectl -n observability create secret generic aiops-webhook \
  --from-literal=url="https://hooks.slack.com/services/XXX/YYY/ZZZ" \
  -o yaml --dry-run=client | kubectl -n observability apply -f -
```

4) Build the detector image locally and load it into minikube
```bash
cd aiops/detector
docker build -t aiops-detector:latest .
minikube image load aiops-detector:latest
```

5) Deploy the detector (configured to use local image and imagePullPolicy=Never)
```bash
kubectl apply -f aiops/k8s/detector-deployment.yaml
kubectl -n observability get pods
```

6) Point the detector to the in-cluster Prometheus Service (DNS)
```bash
kubectl -n observability set env deploy/aiops-detector \
  PROMETHEUS_URL="http://kube-prom-stack-kube-prome-prometheus:9090"
```

7) Smoke test with a simple query
```bash
kubectl -n observability set env deploy/aiops-detector PROM_QUERY='up' MIN_POINTS=5 WINDOW_MINUTES=10
kubectl -n observability rollout status deploy/aiops-detector
kubectl -n observability logs deploy/aiops-detector -f
```
You should see a JSON line every minute like:
`{"points": 5, "last": 1.0, "has_anomaly": false, "num_anomalies": 0}`

8) Switch to p95 latency (if you have HTTP request histogram metrics)
```bash
kubectl -n observability set env deploy/aiops-detector \
  PROM_QUERY='histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket{job="web"}[5m])) by (le))' \
  MIN_POINTS=30 WINDOW_MINUTES=120 CONTAMINATION=0.05
kubectl -n observability logs deploy/aiops-detector -f
```

## Quick anomaly demo 
Use a naturally varying metric to trigger anomalies faster:
```bash
kubectl -n observability set env deploy/aiops-detector \
  PROM_QUERY='sum(rate(node_cpu_seconds_total[1m]))' \
  MIN_POINTS=8 WINDOW_MINUTES=10 CONTAMINATION=0.4
kubectl -n observability logs deploy/aiops-detector -f
```

## Using Docker Hub instead of local images
1) Build and push (replace USERNAME with your Docker Hub username)
```bash
cd aiops/detector
docker build -t aiops-detector:latest .
docker tag aiops-detector:latest docker.io/USERNAME/aiops-detector:latest
docker push docker.io/USERNAME/aiops-detector:latest
```
2) Update `aiops/k8s/detector-deployment.yaml`:
```yaml
image: docker.io/USERNAME/aiops-detector:latest
imagePullPolicy: IfNotPresent
```
3) Re-apply:
```bash
kubectl apply -f aiops/k8s/detector-deployment.yaml
```

## Open Grafana to visualize
```bash
kubectl -n observability port-forward svc/kube-prom-stack-grafana 3000:80
# Open http://localhost:3000 (default often admin/prom-operator)
# Create a panel using the same PROM_QUERY
```

## Useful PromQL
- p95 latency (histogram):
```
histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket{job="web"}[5m])) by (le))
```
- Mean latency (summaries only):
```
rate(http_request_duration_seconds_sum[1m]) / rate(http_request_duration_seconds_count[1m])
```
- Example recording rules: `aiops/prometheus/latency-rules.yaml`.

## Environment variables
- PROMETHEUS_URL: in-cluster Prometheus base URL
- PROM_QUERY: PromQL time series to evaluate over a range
- WINDOW_MINUTES: history window size
- STEP: range query step (default 60s)
- CONTAMINATION: expected anomaly fraction (default 0.05)
- MIN_POINTS: minimum points before detection starts
- ALERT_WEBHOOK: URL from Secret `aiops-webhook`

## Troubleshooting
- CreateContainerConfigError: Secret `aiops-webhook` missing → create/update it.
- NameResolution/Connection refused: wait until Prometheus is Running, then set `PROMETHEUS_URL` to the Service (`http://kube-prom-stack-kube-prome-prometheus:9090`).
- ImagePullBackOff on minikube: use local image and `imagePullPolicy: Never` with `minikube image load`.

## What we implemented
- Python detector to fetch Prometheus time series and detect anomalies with IsolationForest.
- Dockerfile and requirements for the detector image.
- Kubernetes manifests (Namespace/ServiceAccount/Deployment/Secret).
- Local-image workflow for minikube to avoid registry pushes.
- Installed kube-prometheus-stack (Prometheus + Grafana + Alertmanager).
- Wired the detector to Prometheus Service and validated with `up`, then latency queries.

