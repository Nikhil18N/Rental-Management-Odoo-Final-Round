# RentVista - Rental Management System

A comprehensive rental management application built with modern web technologies.

## 🎯 Overview

RentVista is a full-featured rental management system designed to streamline the entire rental process. It provides a unified platform to manage products, schedule pickups, handle customer bookings, and process payments.

## ✨ Features

### 🏪 Core Rental Management
- **Product Catalog** - Manage rental inventory with flexible pricing
- **Customer Management** - Complete customer profiles and history
- **Booking Workflow** - From quotation to completion
- **Payment Processing** - Multiple payment methods and invoicing
- **Delivery Tracking** - Pickup and return scheduling

### 📊 Business Intelligence
- **Analytics Dashboard** - Revenue and performance metrics
- **Reporting System** - Detailed business reports
- **Customer Insights** - Rating and behavior analysis
- **Inventory Tracking** - Real-time availability management

### 🔧 Technical Features
- **Modern UI** - Responsive design with dark/light mode
- **Type Safety** - Full TypeScript implementation
- **Real-time Updates** - Live data synchronization
- **Secure Authentication** - JWT-based user management
- **API Documentation** - Complete REST API reference

## 🏗️ Architecture

```
Frontend (React + TypeScript)  ←→  Backend (Node.js + Express)  ←→  Database (MongoDB)
         ↓                                    ↓                            ↓
    Vite + Shadcn/UI                   JWT + Validation                 Mongoose ODM
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Setup
```bash
# Clone the repository
git clone <repository-url>
cd rental-management-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:8080
- **Dashboard**: Complete rental management interface
- **API Documentation**: Available in `/docs` folder

## 📁 Project Structure

```
├── src/                  # Frontend application
│   ├── components/       # Reusable UI components
│   ├── pages/           # Route-based pages
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript definitions
│   └── lib/             # Utility functions
├── docs/                # Complete documentation
│   ├── api/             # API documentation
│   ├── frontend/        # Frontend guides
│   ├── backend/         # Backend architecture
│   ├── database/        # Database schema
│   └── deployment/      # Deployment guides
└── README.md            # This file
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

| Section | Description |
|---------|-------------|
| [**📖 Documentation Overview**](docs/README.md) | Complete guide navigation |
| [**🌐 API Reference**](docs/api/README.md) | REST API documentation |
| [**🎨 Frontend Guide**](docs/frontend/README.md) | React app development |
| [**🖥️ Backend Guide**](docs/backend/README.md) | Server architecture |
| [**💾 Database Schema**](docs/database/README.md) | Data models and relationships |
| [**🚀 Deployment Guide**](docs/deployment/README.md) | Production deployment |
| [**🤝 Contributing**](docs/CONTRIBUTING.md) | Development guidelines |
| [**📁 Project Structure**](docs/PROJECT_STRUCTURE.md) | Code organization |

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tooling
- **Shadcn/UI** - Modern component library
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching

### Backend (Planned)
- **Node.js** with Express
- **TypeScript** - Type safety
- **MongoDB** with Mongoose
- **JWT** - Authentication
- **Stripe/Razorpay** - Payment processing

## 🎮 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm test           # Run tests
```

## 🌟 Key Features Implemented

### ✅ Dashboard
- Revenue analytics and metrics
- Recent orders overview
- System alerts and notifications
- Quick action shortcuts

### ✅ Product Management
- Complete product catalog
- Flexible pricing (hourly/daily/weekly)
- Inventory tracking
- Category-based organization

### ✅ Booking System
- Full booking lifecycle management
- Status tracking (pending → active → completed)
- Customer booking history
- Search and filtering

### ✅ Customer Management
- Customer profiles with contact details
- Booking history and analytics
- Rating system
- VIP customer identification

## 🚀 Roadmap

### Phase 1 (Current)
- [x] Frontend application with core features
- [x] Product, booking, and customer management
- [x] Responsive UI with modern design
- [x] Complete documentation structure

### Phase 2 (Next)
- [ ] Backend API development
- [ ] Database integration
- [ ] Authentication system
- [ ] Payment gateway integration

### Phase 3 (Future)
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Multi-tenant support
- [ ] Advanced notification system

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on:
- Development setup
- Coding standards
- Testing requirements
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: Check the [docs](docs/) folder
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub discussions for questions

## 🙏 Acknowledgments

- **Shadcn/UI** - For the amazing component library
- **Tailwind CSS** - For the utility-first CSS framework
- **React Team** - For the powerful frontend framework
- **TypeScript Team** - For type safety and developer experience

---

**Made with ❤️ for the rental management community**

*Last Updated: August 11, 2025*

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/94c33974-6dc8-4312-a3d8-2db4333166ce) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
