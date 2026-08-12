Dockerization instructions (FastAPI / Python)

Example Dockerfile (use from repo root):

```
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app
# tune workers/uvicorn settings for your CPU
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and tag locally:

  docker build -t yourhubuser/opssage-ai:latest .
  docker run -p 8000:8000 yourhubuser/opssage-ai:latest

Push to Docker Hub:

  docker login
  docker push yourhubuser/opssage-ai:latest

Deploy options:
- Render / Fly / Railway: connect GitHub repo and use Dockerfile or build from requirements
- DigitalOcean App Platform: push image or connect repo
- Self-host: use docker-compose or Kubernetes

Notes:
- Ensure secrets (API keys) are provided as env vars in the platform, not baked into the image.
- Use a production server (gunicorn + uvicorn workers) for heavy loads.
