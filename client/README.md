# SketchMonk Client

This is the frontend application for SketchMonk, built with React and Vite.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Features

- Real-time drawing canvas
- Save and load drawings
- User authentication
- Gallery view for saved drawings
