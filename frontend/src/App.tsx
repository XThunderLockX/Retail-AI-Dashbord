import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tabs,
  Tab,
  IconButton,
  Badge
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Lightbulb as IdeasIcon,
  Assignment as TasksIcon,
  People as TeamIcon,
  Analytics as AnalyticsIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import DashboardOverview from './components/DashboardOverview';
import IdeasManager from './components/IdeasManager';
import TasksManager from './components/TasksManager';
import TeamManager from './components/TeamManager';
import AnalyticsView from './components/AnalyticsView';
import NotificationDisplay from './components/NotificationDisplay';
import { NotificationProvider } from './contexts/NotificationContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Retail AI Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab icon={<DashboardIcon />} label="Dashboard" />
              <Tab icon={<IdeasIcon />} label="Ideas" />
              <Tab icon={<TasksIcon />} label="Tasks" />
              <Tab icon={<TeamIcon />} label="Team" />
              <Tab icon={<AnalyticsIcon />} label="Analytics" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <DashboardOverview />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <IdeasManager />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <TasksManager />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <TeamManager />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <AnalyticsView />
          </TabPanel>
        </Box>
        <NotificationDisplay />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
