import { Box, Typography } from '@mui/material';
import NotificationForm from '../components/NotificationForm';

function AdminPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Notification Center
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Use this page to create notifications for students in real time.
      </Typography>
      <NotificationForm />
    </Box>
  );
}

export default AdminPage;
