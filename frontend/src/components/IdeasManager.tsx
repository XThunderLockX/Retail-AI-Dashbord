import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_by: string;
  created_at: string;
}

const IdeasManager: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [open, setOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium',
    created_by: ''
  });

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ideas);
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const handleOpen = () => {
    setEditingIdea(null);
    setFormData({
      title: '',
      description: '',
      category: 'general',
      priority: 'medium',
      created_by: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIdea(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingIdea) {
        await axios.put(`${API_ENDPOINTS.ideas}/${editingIdea.id}`, {
          ...formData,
          status: editingIdea.status
        });
      } else {
        await axios.post(API_ENDPOINTS.ideas, formData);
      }
      fetchIdeas();
      handleClose();
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  const handleEdit = (idea: Idea) => {
    setEditingIdea(idea);
    setFormData({
      title: idea.title,
      description: idea.description,
      category: idea.category,
      priority: idea.priority,
      created_by: idea.created_by
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_ENDPOINTS.ideas}/${id}`);
      fetchIdeas();
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, idea: Idea) => {
    setAnchorEl(event.currentTarget);
    setSelectedIdea(idea);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIdea(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Ideas Manager</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Idea
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {ideas.map((idea) => (
          <Box key={idea.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" component="h2">
                    {idea.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, idea)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {idea.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={idea.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={idea.priority}
                    size="small"
                    color={getPriorityColor(idea.priority) as any}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={idea.status}
                    size="small"
                    color={getStatusColor(idea.status) as any}
                  />
                </Box>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Created by: {idea.created_by} • {new Date(idea.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          if (selectedIdea) {
            handleEdit(selectedIdea);
          }
          handleMenuClose();
        }}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedIdea) {
            handleDelete(selectedIdea.id);
          }
          handleMenuClose();
        }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingIdea ? 'Edit Idea' : 'Add New Idea'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Priority"
            fullWidth
            select
            variant="outlined"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            sx={{ mb: 2 }}
            SelectProps={{ native: true }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </TextField>
          <TextField
            margin="dense"
            label="Created By"
            fullWidth
            variant="outlined"
            value={formData.created_by}
            onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingIdea ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IdeasManager;