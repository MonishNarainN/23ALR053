import { Card, CardContent, Typography, Chip, Button, Stack } from '@mui/material';

function NotificationCard({ notification, onMarkViewed }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6">{notification.title}</Typography>
          <Chip label={notification.priority} color={notification.viewed ? 'default' : 'primary'} />
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          {notification.message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {notification.recipient} • {new Date(notification.createdAt).toLocaleString()}
        </Typography>
        {!notification.viewed && (
          <Button onClick={() => onMarkViewed(notification.id)} size="small" sx={{ mt: 2 }}>
            Mark as viewed
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
