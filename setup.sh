#!/usr/bin/env bash
# Quick setup script: build image and run with example env
set -euo pipefail
if [ -f example.env ]; then
  export $(grep -v '^#' example.env | xargs)
fi
IMAGE_TAG=opssage-ai:local
docker build -t $IMAGE_TAG .
# Run with port mapping and environment example
docker run --rm -p ${PORT:-8000}:8000 \
  -e X_API_KEY=${X_API_KEY:-demo_key} \
  -e PROMETHEUS_ENABLED=${PROMETHEUS_ENABLED:-true} \
  $IMAGE_TAG
