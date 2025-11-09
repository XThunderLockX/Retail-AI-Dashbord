# Retail AI Dashboard - Agent Guidelines

## Commands
### Frontend (React/TypeScript)
```bash
cd frontend
npm start                    # Development server
npm run build               # Production build
npm test -- --testNamePattern="specific test"  # Single test
npm test -- --watchAll=false  # Run all tests once
```

### Backend (Node.js/Express)
```bash
cd backend
npm start                   # Production server
npm run dev                  # Development with nodemon
npm test -- --testNamePattern="specific test"  # Single test
```

### Root Commands
```bash
npm run dev                  # Concurrent frontend/backend dev
npm run build                # Frontend build only
npm run install:all          # Install all dependencies
```

## Code Style Guidelines

### Imports (React Components)
```typescript
// React imports first
import React, { useState, useEffect } from 'react';

// Material-UI imports
import { Box, Typography, Card } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';

// Third-party libraries
import axios from 'axios';

// Local imports
import { API_ENDPOINTS } from '../config/api';
import DashboardOverview from './components/DashboardOverview';
```

### TypeScript & Types
- Use interfaces for all data structures: `interface Analytics { ... }`
- Functional components: `const Component: React.FC = () => { ... }`
- Event typing: `React.MouseEvent<HTMLElement>`, `React.SyntheticEvent`
- Strict mode enabled - always type props and returns

### Naming Conventions
- Components: PascalCase (`DashboardOverview`, `IdeasManager`)
- Variables/Functions: camelCase (`fetchData`, `isLoading`)
- Files: PascalCase for components (`DashboardOverview.tsx`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

### Error Handling
```typescript
// Frontend async operations
try {
  const response = await axios.get(API_ENDPOINTS.ideas);
  setData(response.data);
} catch (error) {
  console.error('Error fetching ideas:', error);
  // Use notification context for user feedback
}
```

### Material-UI Patterns
- Use `sx` prop for styling: `<Box sx={{ display: 'flex', gap: 2 }}>`
- Responsive design with Grid system
- Consistent spacing using theme spacing units
- Card-based layouts for data display

### API Integration
- Use centralized `API_ENDPOINTS` from config/api.ts
- Axios for HTTP requests
- Handle loading states and errors consistently
- Environment-aware URLs (development proxy vs production)

### Backend Patterns
- Express Router for modular routes
- SQLite3 with proper error handling
- Middleware order: helmet → cors → morgan → body parsers
- RESTful endpoints with standard HTTP methods
- Centralized error middleware

## Testing
- Jest for both frontend and backend
- Test files: `*.test.tsx` or `*.test.js`
- Single test: `npm test -- --testNamePattern="test name"`
- Mock API calls in frontend tests

## Architecture Notes
- Monorepo with frontend/backend separation
- Context API for global state (notifications)
- Material-UI v7 with emotion styling
- SQLite for simple deployment
- Docker containerization support