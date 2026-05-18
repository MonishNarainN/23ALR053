const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/notifications';

const fetchNotifications = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}?${query}`);
  return response.json();
};

const createNotification = async (payload) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
};

const createAdminNotification = async (payload) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL_BASE || 'http://localhost:4000'}/api/admin/notifications/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': process.env.REACT_APP_ADMIN_API_KEY || 'secret-admin-key',
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

const markAsViewed = async (id) => {
  const response = await fetch(`${API_URL}/${id}/view`, {
    method: 'PATCH',
  });
  return response.json();
};

const fetchPriorityInbox = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/priority-inbox?${query}`);
  return response.json();
};

export { fetchNotifications, createNotification, createAdminNotification, markAsViewed, fetchPriorityInbox };
