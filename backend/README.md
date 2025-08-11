# Rental Management Backend

This is the backend API server for the Rental Management System, built with Express.js and TypeScript.

## Features

- RESTful API endpoints
- TypeScript for type safety
- CORS enabled for frontend communication
- Environment variable configuration
- Hot reload in development

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/properties` - Get all properties
- `GET /api/bookings` - Get all bookings  
- `GET /api/customers` - Get all customers

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
backend/
├── src/
│   └── server.ts          # Main server file
├── dist/                  # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```
