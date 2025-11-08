# Retail AI Dashboard - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Ports 3000 and 5001 available
- At least 1GB RAM available

### One-Command Deployment
```bash
./deploy.sh
```

## 📦 Manual Deployment

### Development Environment
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment
```bash
# Use production configuration
docker-compose -f docker-compose.prod.yml up --build -d

# Scale services (if needed)
docker-compose -f docker-compose.prod.yml up --build -d --scale backend=2
```

## 🏗️ Architecture

### Services
- **Frontend**: React app served by Nginx (Port 3000)
- **Backend**: Node.js/Express API (Port 5001)
- **Database**: SQLite (persisted in volume)

### Network
- Custom bridge network `retail-ai-network`
- Services communicate internally
- Only necessary ports exposed

## 🔧 Configuration

### Environment Variables
Backend:
- `NODE_ENV`: Environment (development/production)
- `PORT`: API server port (default: 5001)

### Volumes
- `./backend/database:/app/database`: Persistent database storage
- `./backend/logs:/app/logs`: Application logs (production)

## 📊 Monitoring

### Health Checks
- Backend: `GET /api/health`
- Frontend: HTTP 200 response

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🔒 Security Features

### Frontend (Nginx)
- GZIP compression
- Security headers
- XSS protection
- Content Security Policy

### Backend
- Helmet.js security middleware
- CORS configuration
- Request logging with Morgan

## 🚀 Production Deployment

### Using Production Config
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### SSL/HTTPS Setup
1. Place SSL certificates in `./frontend/ssl/`
2. Update nginx configuration for HTTPS
3. Update docker-compose.prod.yml to expose port 443

### Environment-Specific Configs
- Development: `docker-compose.yml`
- Production: `docker-compose.prod.yml`

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale backend services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

### Resource Limits
Production config includes:
- CPU and memory limits
- Health checks
- Restart policies

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill processes on ports 3000 and 5001
   sudo lsof -ti:3000 | xargs kill -9
   sudo lsof -ti:5001 | xargs kill -9
   ```

2. **Container Won't Start**
   ```bash
   # Check logs
   docker-compose logs service-name
   
   # Rebuild
   docker-compose build --no-cache service-name
   ```

3. **Database Issues**
   ```bash
   # Check database volume
   docker volume ls
   docker volume inspect retail-ai_retail-ai-database
   ```

4. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER ./backend/database
   ```

### Health Check Failures
```bash
# Manual health check
curl http://localhost:5001/api/health
curl http://localhost:3000

# Check container status
docker-compose ps
```

## 🔄 Updates

### Updating the Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up --build -d

# Or for production
docker-compose -f docker-compose.prod.yml up --build -d
```

### Database Backups
```bash
# Backup database
docker exec retail-ai-backend-prod cp /app/database/retail_ai.db ./backup/

# Restore database
docker cp ./backup/retail_ai.db retail-ai-backend-prod:/app/database/
```

## 📱 Access URLs

After successful deployment:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/api/health

## 🛠️ Development

### Local Development (without Docker)
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Building Images
```bash
# Build backend image
docker build -t retail-ai-backend ./backend

# Build frontend image
docker build -t retail-ai-frontend ./frontend
```

## 📞 Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify health checks
3. Check resource usage
4. Review this documentation

## 🎯 Next Steps

Consider for production:
1. Set up CI/CD pipeline
2. Configure monitoring (Prometheus/Grafana)
3. Set up log aggregation (ELK stack)
4. Implement backup strategies
5. Configure load balancing
6. Set up SSL certificates