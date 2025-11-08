import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SalesMetric {
  id: number;
  metric_name: string;
  metric_value: number;
  date: string;
  category: string;
}

const AnalyticsView: React.FC = () => {
  const [salesMetrics, setSalesMetrics] = useState<SalesMetric[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    metric_name: '',
    metric_value: '',
    date: '',
    category: ''
  });

  useEffect(() => {
    fetchSalesMetrics();
  }, []);

  const fetchSalesMetrics = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.salesMetrics);
      setSalesMetrics(response.data);
    } catch (error) {
      console.error('Error fetching sales metrics:', error);
    }
  };

  const handleOpen = () => {
    setFormData({
      metric_name: '',
      metric_value: '',
      date: '',
      category: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(API_ENDPOINTS.salesMetrics, {
        ...formData,
        metric_value: parseFloat(formData.metric_value)
      });
      fetchSalesMetrics();
      handleClose();
    } catch (error) {
      console.error('Error adding sales metric:', error);
    }
  };

  const lineChartData = {
    labels: salesMetrics
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(metric => new Date(metric.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Sales Performance',
        data: salesMetrics
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(metric => metric.metric_value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Completed Tasks', 'In Progress', 'To Do'],
    datasets: [
      {
        data: [12, 8, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Performance Over Time',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Task Status Distribution',
      },
    },
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Sales Metric
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 3 }}>
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Sales Performance
              </Typography>
              {salesMetrics.length > 0 ? (
                <Line data={lineChartData} options={chartOptions} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No sales metrics available. Add some data to see the chart.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Task Distribution
              </Typography>
              <Pie data={pieChartData} options={pieOptions} />
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Sales Metrics
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {salesMetrics.slice(-10).reverse().map((metric) => (
                  <Box key={metric.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          {metric.metric_name}
                        </Typography>
                        <Typography variant="h6">
                          ${metric.metric_value.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {new Date(metric.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          {metric.category}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Sales Metric</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Metric Name"
            fullWidth
            variant="outlined"
            value={formData.metric_name}
            onChange={(e) => setFormData({ ...formData, metric_name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Metric Value"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.metric_value}
            onChange={(e) => setFormData({ ...formData, metric_value: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Metric
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnalyticsView;