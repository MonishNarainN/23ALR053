import { useEffect, useState } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { fetchNotifications, markAsViewed } from '../api/notificationApi';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import PaginationControls from '../components/PaginationControls';
import { connectSocket, disconnectSocket } from '../ws/socketClient';

const INITIAL_FILTERS = { status: 'all', priority: '' };

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const loadNotifications = async () => {
    const params = { ...filters, page, limit };
    const result = await fetchNotifications(params);
    setNotifications(result.items || []);
    setTotal(result.total || 0);
  };

  useEffect(() => {
    loadNotifications();
  }, [filters, page]);

  useEffect(() => {
    const socket = connectSocket(() => {
      loadNotifications();
    }, () => {
      loadNotifications();
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleMarkViewed = async (id) => {
    await markAsViewed(id);
    loadNotifications();
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <FilterBar filters={filters} onChange={setFilters} onReset={handleReset} />
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

export default NotificationsPage;
