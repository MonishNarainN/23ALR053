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

1. Install backend dependencies in `notification_app_be/`
2. Install frontend dependencies in `notification_app_fe/`
3. Configure environment variables from `.env.example`
4. Start Redis and queue workers
5. Run backend and frontend concurrently

## Repository Guidelines

- Use frequent commits: `Completed Stage 1 API Design`, `Added logging middleware`, `Implemented priority inbox`, `Added frontend pages`
- Keep code modular and scalable
- Include screenshots and demo notes in the `screenshots/` folder
