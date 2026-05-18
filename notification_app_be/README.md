# Notification Backend

This backend is built with Node.js and Express. It includes Redis queue support, WebSocket notifications, and a priority inbox design.

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies: `npm install`
3. Start Redis and MongoDB
4. Launch server: `npm run dev`
5. Run worker: `npm run worker`

## Architecture

- `src/app.js` - Express application
- `src/server.js` - HTTP server bootstrap
- `src/routes/notifications.js` - API route definitions
- `src/controllers/notificationController.js` - request handling
- `src/services/notificationService.js` - business logic
- `src/services/queueService.js` - Redis queue producer
- `src/workers/notificationWorker.js` - queued processing
- `src/ws/socketServer.js` - WebSocket publisher
- `src/config` - DB and Redis configuration
- `src/utils/priorityInbox.js` - priority ranking logic
- `src/models/notificationModel.js` - MongoDB notification schema
- `src/routes/adminNotifications.js` - dedicated admin notification route
- `src/middleware/adminAuth.js` - admin route authorization

## Role-based notification flow

- `admin` is the sender role and creates notifications
- `student` is the recipient role and receives notifications
- Notifications may be targeted to a specific `recipient` or to `all-students`
- Use query params `recipient` or `recipientRole=student` to fetch student inbox items

## Real-time flow

Admin can send notifications via the API. New notifications are stored in MongoDB, queued in Redis, and broadcast to connected WebSocket clients immediately. Students receive real-time updates without page refresh.
