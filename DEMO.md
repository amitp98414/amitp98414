Quick demo — Run locally

Prerequisites
- Docker
- Docker Compose (optional)

Run with Docker (recommended):

1. Build the image:
   docker build -t opssage-ai:local .
2. Run the container (example):
   docker run -e X_API_KEY=demo_key -p 8000:8000 opssage-ai:local
3. Open API docs: http://localhost:8000/docs

Quick API test (curl):

curl -H "X-API-Key: demo_key" http://localhost:8000/health

Notes:
- Replace demo_key with a real key set in the environment or in an .env file
- For production, provide secrets via the host platform's env settings
