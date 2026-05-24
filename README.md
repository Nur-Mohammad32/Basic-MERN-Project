# Basic MERN Project

A simple notes app built with MongoDB, Express, React, and Node.js. The backend exposes a CRUD API for notes, and the frontend provides a Vite-based UI for creating, editing, viewing, and deleting notes.

## Features

- Create, read, update, and delete notes
- Responsive React UI with Tailwind CSS and DaisyUI
- Backend rate limiting with Upstash Redis
- MongoDB Atlas support, with an in-memory MongoDB fallback for local development
- Production-ready Express static file serving for the frontend build

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS, DaisyUI
- Backend: Node.js, Express, Mongoose, dotenv, cors
- Data: MongoDB / MongoDB Memory Server
- Rate limiting: Upstash Redis

## Project Structure

- `backend/` - Express API, database config, controllers, routes, and middleware
- `frontend/` - React app, pages, components, and API client
- `package.json` - root scripts for bootstrapping and building the app

## Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB connection string if you want persistent storage
- Upstash Redis environment variables for the rate limiter

## Environment Variables

Create a `backend/.env` file with the values you want to use:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token
```

If `MONGODB_URI` is omitted, the backend falls back to an in-memory MongoDB instance for local development.

## Installation

Install dependencies for each workspace:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

## Running Locally

Start the backend:

```bash
npm run dev --prefix backend
```

Start the frontend:

```bash
npm run dev --prefix frontend
```

By default, the frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5001`.

## Build

Build the frontend and prepare the app from the project root:

```bash
npm run build
```

## API Endpoints

Base path: `/api/notes`

- `GET /api/notes` - list all notes
- `GET /api/notes/:id` - get a single note
- `POST /api/notes` - create a note
- `PUT /api/notes/:id` - update a note
- `DELETE /api/notes/:id` - delete a note

## Notes

- In development, the frontend talks to `http://localhost:5001/api`
- In production, the Express server serves the built frontend from `frontend/dist`
- The rate limiter is configured through Upstash Redis environment variables
