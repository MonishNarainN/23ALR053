import { useEffect, useState } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { fetchNotifications, markAsViewed } from '../api/notificationApi';
import NotificationCard from '../components/NotificationCard';
import PaginationControls from '../components/PaginationControls';
import { connectSocket, disconnectSocket } from '../ws/socketClient';

function StudentInboxPage() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const loadStudentNotifications = async () => {
    const result = await fetchNotifications({ recipientRole: 'student', recipient: 'all-students', page, limit });
    setNotifications(result.items || []);
    setTotal(result.total || 0);
  };

  useEffect(() => {
    loadStudentNotifications();
  }, [page]);

  useEffect(() => {
    connectSocket(loadStudentNotifications, loadStudentNotifications);
    return () => disconnectSocket();
  }, []);

  const handleMarkViewed = async (id) => {
    await markAsViewed(id);
    loadStudentNotifications();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Student Inbox
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        This view shows notifications targeted at students in real time.
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkViewed={handleMarkViewed}
        />
      ))}
      <PaginationControls page={page} total={total} limit={limit} onChange={setPage} />
    </Box>
  );
}

export default StudentInboxPage;
