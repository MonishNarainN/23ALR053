# 23ALR053 - AffordMed Notification System

This repository contains the final submission scaffold for the AffordMed Full Stack Campus Hiring Evaluation. It includes:

- `logging_middleware/` - reusable logging utility and API middleware
- `notification_app_be/` - Node.js + Express backend with Redis queues and WebSocket support
- `notification_app_fe/` - React frontend using Material UI
- `notification_system_design.md` - stage-wise design answers
- `screenshots/` - demo and verification screenshots

## Project Structure

```
23ALR053/
│
├── logging_middleware/
├── notification_app_be/
├── notification_app_fe/
├── notification_system_design.md
├── screenshots/
└── README.md
```

## Setup Overview

1. Install backend dependencies:
   - `cd notification_app_be`
   - `npm install`
2. Install frontend dependencies:
   - `cd ../notification_app_fe`
   - `npm install`
3. Configure environment variables:
   - copy `.env.example` to `.env` in both `notification_app_be/` and `notification_app_fe/` as needed
4. Start the backend:
   - `cd ../notification_app_be`
   - `npm run dev`
5. Start the frontend:
   - `cd ../notification_app_fe`
   - `npm run dev`

> Redis is optional. If Redis is not available, the backend still starts and the app continues to work, but queue and pub/sub features are disabled.

## Screenshot Notes

The repository includes a `screenshots/` folder intended for:
- `all-notifications-page.png`
- `priority-inbox.png`
- `mobile-view.png`
- `filter-placement.png`
- `viewed-unviewed.png`
- `api-response.png`
- `backend-running.png`
- `frontend-running.png`
- `queue-worker.png`
- `websocket-working.png`

## Repository Guidelines

- Use frequent commits: `Completed Stage 1 API Design`, `Added logging middleware`, `Implemented priority inbox`, `Added frontend pages`
- Keep code modular and scalable
- Include screenshots and demo notes in the `screenshots/` folder
