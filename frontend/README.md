# Rental Management Frontend

This is the frontend application for the Rental Management System, built with React, TypeScript, and Vite.

## Features

- Modern React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui component library
- Responsive design
- Dashboard with analytics
- Property, booking, and customer management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Dashboard
│   │   ├── Products.tsx  # Property management
│   │   ├── Bookings.tsx  # Booking management
│   │   └── Customers.tsx # Customer management
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript definitions
├── public/               # Static assets
├── package.json
├── vite.config.ts
└── README.md
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React (icons)
