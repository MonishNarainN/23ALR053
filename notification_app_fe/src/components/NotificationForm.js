import { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Stack } from '@mui/material';
import { createAdminNotification } from '../api/notificationApi';

const priorities = ['critical', 'high', 'medium', 'normal'];

function NotificationForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all-students');
  const [priority, setPriority] = useState('normal');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !message) return;

    await createAdminNotification({
      title,
      message,
      recipient,
      recipientRole: 'student',
      priority,
      sender: 'admin',
      senderRole: 'admin',
    });

    setTitle('');
    setMessage('');
    setPriority('normal');
    if (onCreated) onCreated();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Admin Notification Sender
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="Message"
          value={message}
          required
          multiline
          minRows={3}
          onChange={(event) => setMessage(event.target.value)}
        />
        <TextField
          label="Recipient"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          helperText="Leave all-students to broadcast to all students"
        />
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {priorities.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">
          Send Notification
        </Button>
      </Stack>
    </Box>
  );
}

export default NotificationForm;
