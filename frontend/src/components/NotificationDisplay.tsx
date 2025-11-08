import React from 'react';
import {
  Alert,
  Snackbar,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationDisplay: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  const handleClose = (notificationId: string) => {
    removeNotification(notificationId);
  };

  const getAlertSeverity = (type: string) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        maxWidth: 400,
      }}
    >
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ position: 'relative', mb: 1 }}
        >
          <Alert
            severity={getAlertSeverity(notification.type)}
            action={
              <IconButton
                size="small"
                onClick={() => handleClose(notification.id)}
                sx={{ ml: 1 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{ width: '100%' }}
          >
            <Typography variant="body2">
              {notification.message}
            </Typography>
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default NotificationDisplay;