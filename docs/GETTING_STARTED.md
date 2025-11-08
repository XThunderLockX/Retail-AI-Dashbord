# Getting Started Guide

## Installation

1. Clone the repository and navigate to the project directory:
```bash
cd retail-ai
```

2. Install all dependencies:
```bash
npm run install:all
```

## Development

Start both frontend and backend servers:
```bash
npm run dev
```

This will start:
- Backend API server on http://localhost:5000
- React frontend on http://localhost:3000

## Features Overview

### Dashboard Overview
- Real-time statistics for ideas, tasks, and team members
- Progress indicators and completion rates
- Recent activity feeds

### Ideas Manager
- Create, edit, and delete ideas
- Categorize by priority and status
- Track idea progression from concept to completion

### Tasks Manager
- Comprehensive task management with assignments
- Due date tracking with overdue notifications
- Status management (Todo, In Progress, Done)

### Team Manager
- Add and manage team members
- Department and role organization
- Team member profiles with contact information

### Analytics Dashboard
- Sales performance tracking with visual charts
- Task distribution analytics
- Custom metric input and reporting

## API Endpoints

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

### Analytics
- `GET /api/analytics` - Get dashboard analytics
- `GET /api/analytics/sales-metrics` - Get sales metrics
- `POST /api/analytics/sales-metrics` - Add sales metric

## Database Schema

The application uses SQLite with the following tables:
- `ideas` - Store sales and marketing ideas
- `tasks` - Task management and assignments
- `team_members` - Team member information
- `sales_metrics` - Sales performance data
- `marketing_campaigns` - Campaign management

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Follow the existing code style and patterns
2. Test all new features
3. Update documentation as needed
4. Create pull requests for review