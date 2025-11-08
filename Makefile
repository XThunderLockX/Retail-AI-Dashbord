# Retail AI Dashboard - Makefile

.PHONY: help build up down logs clean health dev prod

# Default target
help:
	@echo "Retail AI Dashboard - Available Commands:"
	@echo ""
	@echo "  build     - Build all Docker images"
	@echo "  up        - Start development environment"
	@echo "  down      - Stop all services"
	@echo "  logs      - Show logs for all services"
	@echo "  clean     - Remove containers, images, and volumes"
	@echo "  health    - Check health of all services"
	@echo "  dev       - Start development environment"
	@echo "  prod      - Start production environment"
	@echo "  deploy    - Deploy using deployment script"

# Build all images
build:
	@echo "🏗️  Building Docker images..."
	docker-compose build

# Start development environment
up:
	@echo "🚀 Starting development environment..."
	docker-compose up -d
	@echo "⏳ Waiting for services to start..."
	sleep 10
	$(MAKE) health

# Stop all services
down:
	@echo "🛑 Stopping all services..."
	docker-compose down

# Show logs
logs:
	@echo "📋 Showing logs..."
	docker-compose logs -f

# Clean everything
clean:
	@echo "🧹 Cleaning up..."
	docker-compose down -v --rmi all --remove-orphans
	docker system prune -f

# Check health
health:
	@echo "🔍 Checking service health..."
	@echo "Backend Health:"
	@curl -s http://localhost:5001/api/health | jq . 2>/dev/null || echo "❌ Backend not responding"
	@echo ""
	@echo "Frontend Health:"
	@curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200" && echo "✅ Frontend responding" || echo "❌ Frontend not responding"

# Development environment
dev:
	@echo "🔧 Starting development environment..."
	docker-compose up --build

# Production environment
prod:
	@echo "🏭 Starting production environment..."
	docker-compose -f docker-compose.prod.yml up --build -d
	@echo "⏳ Waiting for services to start..."
	sleep 15
	$(MAKE) health

# Deploy using script
deploy:
	@echo "🚀 Deploying using deployment script..."
	./deploy.sh

# Quick status check
status:
	@echo "📊 Service Status:"
	docker-compose ps