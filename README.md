# 🛍️ Retail AI Dashboard

A comprehensive dashboard for retail sales and marketing teams to manage ideas, tasks, team members, and analytics.

## ✨ Features

- **📊 Dashboard Overview** - Real-time analytics and metrics
- **💡 Ideas Manager** - Track and manage innovation ideas
- **📋 Tasks Manager** - Task assignment and progress tracking
- **👥 Team Manager** - Team member management
- **📈 Analytics View** - Sales metrics and visualizations

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Material-UI
- **Backend**: Node.js + Express + SQLite
- **Deployment**: Docker + Docker Compose
- **Visualization**: Chart.js

## 🚀 Quick Start

### Option 1: Docker Deployment (Recommended)
```bash
# Clone and navigate to project
git clone <repository-url>
cd retail-ai

# One-command deployment
./deploy.sh
```

### Option 2: Using Make
```bash
# Start development environment
make dev

# Start production environment
make prod

# Check status
make status
```

### Option 3: Manual Docker
```bash
# Development
docker-compose up --build

# Production
docker-compose -f docker-compose.prod.yml up --build -d
```

### Option 4: Local Development
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

## 📱 Access

After deployment:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health

## 📊 API Endpoints

### Ideas
- `GET /api/ideas` - List all ideas
- `POST /api/ideas` - Create new idea
- `PUT /api/ideas/:id` - Update idea
- `DELETE /api/ideas/:id` - Delete idea

### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Team
- `GET /api/team` - List team members
- `POST /api/team` - Add team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Remove team member

### Analytics
- `GET /api/analytics` - Dashboard analytics
- `GET /api/analytics/sales-metrics` - Sales metrics data
- `POST /api/analytics/sales-metrics` - Add sales metric

## 🛠️ Development

### Project Structure
```
retail-ai/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   └── App.tsx        # Main app component
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── database/           # SQLite database
│   ├── server.js          # Express server
│   └── Dockerfile
├── docker-compose.yml       # Development configuration
├── docker-compose.prod.yml  # Production configuration
├── deploy.sh              # Deployment script
├── Makefile               # Helper commands
└── DEPLOYMENT.md         # Detailed deployment guide
```

### Available Scripts

#### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

#### Backend
```bash
npm start          # Start production server
npm run dev       # Start development server with hot reload
npm test           # Run tests
```

#### Docker Commands
```bash
make build         # Build all images
make up           # Start development
make prod         # Start production
make logs         # View logs
make down         # Stop services
make clean        # Clean up everything
make health       # Check service health
```

## 🔧 Configuration

### Environment Variables
Create `.env` files in both frontend and backend directories:

#### Backend (.env)
```
PORT=5001
NODE_ENV=development
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5001
```

## 📦 Deployment

### Prerequisites
- Docker and Docker Compose
- Ports 3000 and 5001 available
- Minimum 1GB RAM

### Production Deployment
```bash
# Using production configuration
docker-compose -f docker-compose.prod.yml up -d

# Or using the deployment script
./deploy.sh
```

### Features in Production
- ✅ Health checks
- ✅ Automatic restarts
- ✅ Resource limits
- ✅ Security headers
- ✅ GZIP compression
- ✅ Persistent storage

## 🔒 Security

- Frontend served by Nginx with security headers
- Backend uses Helmet.js for security
- CORS properly configured
- No sensitive data in client-side code
- Environment variables for configuration

## 📈 Monitoring

### Health Checks
- Backend: `/api/health` endpoint
- Frontend: HTTP response check

### Logging
- Structured logging with Morgan
- Container logs accessible via Docker
- Production logs persisted to volume

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

### API Testing
```bash
# Health check
curl http://localhost:5001/api/health

# Test endpoints
curl http://localhost:5001/api/ideas
curl http://localhost:5001/api/tasks
```

## 🔄 Updates

### Updating Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up --build -d

# Or for production
docker-compose -f docker-compose.prod.yml up --build -d
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Kill processes on ports
   sudo lsof -ti:3000 | xargs kill -9
   sudo lsof -ti:5001 | xargs kill -9
   ```

2. **Container Issues**
   ```bash
   # View logs
   docker-compose logs -f
   
   # Rebuild
   docker-compose build --no-cache
   ```

3. **Database Issues**
   ```bash
   # Check database permissions
   ls -la backend/database/
   
   # Reset database
   rm backend/database/retail_ai.db
   docker-compose restart backend
   ```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Check the [Deployment Guide](DEPLOYMENT.md)
- Review this README
- Check application logs
- Create an issue in the repository

## 🎯 Current Status

✅ **Fully Functional Application**
- Backend API running on port 5001 with all CRUD operations
- Frontend React app on port 3000 with Material-UI components
- Real-time notification system implemented
- Docker deployment configuration complete
- All API endpoints tested and working

✅ **Features Implemented**
- Dashboard with real-time analytics
- Ideas management with full CRUD
- Tasks management with assignment tracking
- Team member management
- Sales metrics and visualizations
- Toast notification system
- Responsive design with CSS Grid

✅ **Production Ready**
- Multi-stage Docker builds
- Nginx reverse proxy configuration
- Health checks and monitoring
- Security headers and CORS
- Persistent data storage
- Environment-based configuration

---

**Built with ❤️ for retail teams**