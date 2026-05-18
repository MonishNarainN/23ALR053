# Notification Frontend

React frontend for AffordMed notifications.

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies: `npm install`
3. Run frontend: `npm start`

## Pages

- `NotificationsPage` - list notifications with filters and pagination
- `StudentInboxPage` - student-only inbox view with real-time updates
- `PriorityInboxPage` - displays high-priority notifications first
- `AdminPage` - admin create notification page

## Architecture

- `src/api/notificationApi.js` - API integration
- `src/components` - reusable UI components
- `src/pages` - feature page components
- `src/ws/socketClient.js` - WebSocket client
- `src/theme.js` - Material UI theme

## Real-time support

The frontend connects to the backend WebSocket server and refreshes the notification list when new notifications arrive or when message status changes. An admin notification sender form is included for testing real-time delivery.

### Environment variables

- `REACT_APP_API_URL` - backend notification API endpoint
- `REACT_APP_WS_URL` - backend WebSocket URL
- `REACT_APP_API_URL_BASE` - backend base URL for admin routes
- `REACT_APP_ADMIN_API_KEY` - admin API token used by the admin notification form
