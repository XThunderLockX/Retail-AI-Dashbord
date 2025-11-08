// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://retail-ai-dashbord.onrender.com' 
    : '');  // Use proxy in development

export const API_ENDPOINTS = {
  ideas: `${API_BASE_URL}/api/ideas`,
  tasks: `${API_BASE_URL}/api/tasks`,
  team: `${API_BASE_URL}/api/team`,
  analytics: `${API_BASE_URL}/api/analytics`,
  salesMetrics: `${API_BASE_URL}/api/analytics/sales-metrics`,
  health: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;