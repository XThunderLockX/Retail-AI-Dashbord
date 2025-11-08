#!/bin/bash

# Retail AI Dashboard Deployment Script
# This script builds and deploys the complete application using Docker

set -e

echo "🚀 Starting Retail AI Dashboard Deployment..."

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed or not in PATH"
    echo "Please install Docker and ensure it's running"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    echo "Please install Docker Compose"
    exit 1
fi

# Navigate to project root
cd "$(dirname "$0")"

echo "📦 Building and starting containers..."

# Use docker compose if available, otherwise docker-compose
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

# Build and start services
$COMPOSE_CMD up --build -d

echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check if services are running
echo "🔍 Checking service health..."

# Check backend health
if curl -f http://localhost:5001/api/health &> /dev/null; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend is not responding"
    $COMPOSE_CMD logs backend
    exit 1
fi

# Check frontend health
if curl -f http://localhost:3000 &> /dev/null; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend is not responding"
    $COMPOSE_CMD logs frontend
    exit 1
fi

echo ""
echo "🎉 Deployment successful!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5001"
echo "📊 Health Check: http://localhost:5001/api/health"
echo ""
echo "To view logs: $COMPOSE_CMD logs -f"
echo "To stop: $COMPOSE_CMD down"
echo "To restart: $COMPOSE_CMD restart"