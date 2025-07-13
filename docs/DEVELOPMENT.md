# 🛠️ Development Guide

Follow these instructions to set up your local development environment.

## Requirements

- Docker
- Node.js (>= 20.x) & npm
- Python 3 & [UV](https://docs.astral.sh/uv/getting-started/installation/)

## 🖥️ Running locally (dev mode)

### 1. Clone the repo:

```sh
git clone https://github.com/jwoirhaye/registry-view.git
cd registry-view
```

### 2. Frontend (Vite + React):

```sh
cd frontend
npm install
npm run dev
```

### 3. Proxy (FastAPI):

```sh
cd proxy
uv venv
uv pip install -r uv.lock
uv run fastapi dev
```

### 4. Docker Registry:

```sh
docker run -d -p 5000:5000 --name registry registry:2
```

## 🐳 Populate Registry with Test Images

To quickly populate your local registry with common Docker images for testing, use the provided script:

```sh
# Make the script executable
chmod +x scripts/populate-registry.sh

# Run the script
./scripts/populate-registry.sh
```

> **Note**: The script is configured to use `localhost:5000` as the registry URL. If your registry runs on a different host/port, edit the `REGISTRY_URL` variable in the script accordingly.

This script will pull and push the following images to your local registry:
- nginx (1.25, latest)
- alpine (3.20, latest)
- busybox (latest)
- caddy (2.7.6, latest)
- redis (7.2, latest)
- node (20, latest)
- python (3.12, latest)

After running the script, you can verify the images were pushed by visiting your registry-view application or using:

```sh
curl http://localhost:5000/v2/_catalog
```