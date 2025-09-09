# Inventra - Inventory Management System

A full-stack web application for managing inventories with custom fields, access control, and real-time discussions.

## Prerequisites

- Node.js 18+ and npm
- Git

## Project Structure

```
inventra/
├── backend/           # Express.js server
├── frontend/         # React application
└── db.json          # Database file
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:3001

### Frontend Setup

1. In a new terminal, navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on http://localhost:3000

## Default Admin Account

- Username: admin
- Password: admin123
- Email: admin@example.com

## Features

- User authentication and authorization
- Custom inventory fields
- Real-time discussions
- Full-text search
- Light/dark theme
- Admin panel
- Access control