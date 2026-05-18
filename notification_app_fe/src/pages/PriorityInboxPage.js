import { useEffect, useState } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { fetchPriorityInbox, markAsViewed } from '../api/notificationApi';
import NotificationCard from '../components/NotificationCard';
import PaginationControls from '../components/PaginationControls';
import { connectSocket, disconnectSocket } from '../ws/socketClient';

function PriorityInboxPage() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const loadPriorityInbox = async () => {
    const result = await fetchPriorityInbox({ page, limit });
    setNotifications(result.items || []);
    setTotal(result.total || 0);
  };

  useEffect(() => {
    loadPriorityInbox();
  }, [page]);

  useEffect(() => {
    connectSocket(loadPriorityInbox, loadPriorityInbox);
    return () => disconnectSocket();
  }, []);

  const handleMarkViewed = async (id) => {
    await markAsViewed(id);
    loadPriorityInbox();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Priority Inbox
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        This view shows only high and critical notifications, sorted by urgency.
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

export default PriorityInboxPage;
