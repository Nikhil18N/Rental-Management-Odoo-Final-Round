# Rental Management System - Odoo Final Round

A comprehensive rental management application built with modern web technologies for efficient property and booking management.

## 🚀 Features

- **Property Management**: Add, edit, and manage rental properties
- **Booking System**: Handle customer bookings and reservations
- **Customer Management**: Maintain customer profiles and history
- **Dashboard Analytics**: Real-time insights and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nikhil18N/Rental-Management-Odoo-Final-Round.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Rental-Management-Odoo-Final-Round
   ```

3. **Install dependencies for all packages**
   ```bash
   npm run install:all
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend simultaneously
   npm run dev
   
   # Or start them separately:
   npm run dev:frontend  # Frontend only (port 5173)
   npm run dev:backend   # Backend only (port 3000)
   ```

5. **Open your browser** and visit `http://localhost:5173`

## 💻 Tech Stack

This project is built with modern technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks and context
- **Routing**: React Router for navigation
- **Icons**: Lucide React icons

## 📁 Project Structure

```
├── frontend/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── Header.tsx  # Application header
│   │   │   ├── Sidebar.tsx # Navigation sidebar
│   │   │   └── Layout.tsx  # Main layout wrapper
│   │   ├── pages/          # Page components
│   │   │   ├── Index.tsx   # Dashboard/Home page
│   │   │   ├── Products.tsx# Property management
│   │   │   ├── Bookings.tsx# Booking management
│   │   │   └── Customers.tsx# Customer management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
├── backend/                # Backend API server
│   ├── backend-example.ts  # Backend implementation example
│   └── package.json        # Backend dependencies
├── package.json            # Root package.json (monorepo)
└── README.md              # Project documentation
```

## 🎯 Available Scripts

### Root Level (Monorepo)
- `npm run dev` - Start both frontend and backend concurrently
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server
- `npm run build` - Build both frontend and backend for production
- `npm run install:all` - Install dependencies for all packages

### Frontend (./frontend/)
- `npm run dev` - Start frontend development server (Vite)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (./backend/)
- `npm run dev` - Start backend development server
- `npm run build` - Build backend for production

## 🚀 Deployment

The application can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📝 License

This project is part of the Odoo Final Round assessment.

## 👨‍💻 Author

**Nikhil** - [GitHub Profile](https://github.com/Nikhil18N)