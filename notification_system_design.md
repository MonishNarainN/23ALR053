# Notification System Design

## Stage 1 answer
Design a notification ingestion API with a schema for source, type, priority, and recipient metadata. Use a persistent data store and fast in-memory queue for delivery.

## Stage 2 answer
Implement a backend with Express routes for creating notifications, fetching inbox items, updating viewed status, and processing priorities. Integrate Redis for queueing and caching.

## Stage 3 answer
Build a React frontend with Material UI. Provide a main notifications page, a priority inbox page, filtering controls, pagination, and viewed/unviewed state indicators.

## Stage 4 answer
Use WebSockets for real-time notification updates. Send new notifications to connected clients, and update inbox content instantly when message status changes.

## Stage 5 answer
Implement priority inbox logic by ranking notifications using priority, timestamp, and user importance. Use worker queue consumers to promote high-priority notifications and notify users immediately.

## Stage 6 explanation
The complete system uses modular services and middleware to scale across API servers, workers, and WebSocket nodes. Backend services are separated into controllers, services, middleware, and queue workers. Frontend components are reusable and responsive. Redis handles pub/sub, caching, and queue persistence, while WebSocket supports real-time updates.
