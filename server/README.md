# SketchMonk Server

This is the backend server for SketchMonk, built with Node.js and Express.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sketchmonk
JWT_SECRET=your_jwt_secret
```

## Running the Application

To start the development server:
```bash
npm run dev
```

The server will be available at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/drawings` - Get all drawings
- `POST /api/drawings` - Save new drawing
- `GET /api/drawings/:id` - Get specific drawing
- `PUT /api/drawings/:id` - Update drawing
- `DELETE /api/drawings/:id` - Delete drawing

## Database

The application uses MongoDB as its database. Make sure MongoDB is running locally or update the MONGODB_URI in the .env file to point to your MongoDB instance.
