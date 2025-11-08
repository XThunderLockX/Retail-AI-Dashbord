import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  Lightbulb,
  Assignment,
  People
} from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

interface Analytics {
  ideas: {
    total_ideas: number;
    completed_ideas: number;
    pending_ideas: number;
  };
  tasks: {
    total_tasks: number;
    completed_tasks: number;
    todo_tasks: number;
    in_progress_tasks: number;
  };
  team: {
    total_team_members: number;
  };
}

const DashboardOverview: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [recentIdeas, setRecentIdeas] = useState<any[]>([]);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
    fetchRecentData();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.analytics);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchRecentData = async () => {
    try {
      const [ideasResponse, tasksResponse] = await Promise.all([
        axios.get(API_ENDPOINTS.ideas),
        axios.get(API_ENDPOINTS.tasks)
      ]);
      setRecentIdeas(ideasResponse.data.slice(0, 5));
      setRecentTasks(tasksResponse.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching recent data:', error);
    }
  };

  const getTaskCompletionRate = () => {
    if (!analytics) return 0;
    const { completed_tasks, total_tasks } = analytics.tasks;
    return total_tasks > 0 ? (completed_tasks / total_tasks) * 100 : 0;
  };

  const getIdeaCompletionRate = () => {
    if (!analytics) return 0;
    const { completed_ideas, total_ideas } = analytics.ideas;
    return total_ideas > 0 ? (completed_ideas / total_ideas) * 100 : 0;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 3 }}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Lightbulb color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Total Ideas
                </Typography>
                <Typography variant="h4">
                  {analytics?.ideas.total_ideas || 0}
                </Typography>
                <Box mt={1}>
                  <LinearProgress 
                    variant="determinate" 
                    value={getIdeaCompletionRate()} 
                  />
                  <Typography variant="caption">
                    {Math.round(getIdeaCompletionRate())}% completed
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Assignment color="secondary" sx={{ mr: 2 }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Total Tasks
                </Typography>
                <Typography variant="h4">
                  {analytics?.tasks.total_tasks || 0}
                </Typography>
                <Box mt={1}>
                  <LinearProgress 
                    variant="determinate" 
                    value={getTaskCompletionRate()} 
                    color="secondary"
                  />
                  <Typography variant="caption">
                    {Math.round(getTaskCompletionRate())}% completed
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <People color="success" sx={{ mr: 2 }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Team Members
                </Typography>
                <Typography variant="h4">
                  {analytics?.team.total_team_members || 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <TrendingUp color="warning" sx={{ mr: 2 }} />
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  In Progress
                </Typography>
                <Typography variant="h4">
                  {analytics?.tasks.in_progress_tasks || 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Ideas
          </Typography>
          <List>
            {recentIdeas.map((idea) => (
              <ListItem key={idea.id}>
                <ListItemText
                  primary={idea.title}
                  secondary={idea.description}
                />
                <Chip 
                  label={idea.status} 
                  size="small" 
                  color={idea.status === 'completed' ? 'success' : 'default'}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Tasks
          </Typography>
          <List>
            {recentTasks.map((task) => (
              <ListItem key={task.id}>
                <ListItemText
                  primary={task.title}
                  secondary={task.assigned_to || 'Unassigned'}
                />
                <Chip 
                  label={task.status} 
                  size="small" 
                  color={task.status === 'done' ? 'success' : 'default'}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardOverview;