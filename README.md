# QuickDeliver Multi-Vendor Platform

A complete multi-vendor food delivery platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-Vendor Support**: Vendors can manage their own stores, products, and orders
- **Customer Interface**: Browse vendors, place orders, track deliveries
- **Delivery Management**: Real-time delivery tracking and management
- **Admin Dashboard**: Complete platform oversight and analytics
- **Review System**: Customer reviews and ratings for vendors and products
- **Advanced Filtering**: Search by category, price, rating, and more
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Prisma ORM with SQLite
- **Authentication**: JWT-based authentication
- **State Management**: React hooks and context
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/multi-vendor-delivery.git
cd multi-vendor-delivery

# Install dependencies
npm install

# Set up the database
npx prisma generate
npx prisma db push

# Run the development server
npm run dev
```

## 🚀 Deployment

This project is configured for GitHub Pages deployment. The build process automatically:

1. Builds the Next.js application
2. Exports static files
3. Deploys to GitHub Pages

### Manual Deployment

```bash
# Build and export for production
npm run build

# The static files will be in the /out directory
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Main customer interface
│   ├── layout.tsx         # Root layout
│   └── not-found.tsx      # 404 page
├── components/            # Reusable React components
│   ├── ui/                # shadcn/ui components
│   ├── auth-system.tsx    # Authentication system
│   ├── vendor-dashboard.tsx # Vendor management
│   ├── order-system.tsx   # Order management
│   ├── delivery-management.tsx # Delivery tracking
│   ├── product-catalog.tsx # Product browsing
│   ├── review-system.tsx  # Review and rating system
│   └── admin-dashboard.tsx # Admin interface
├── lib/                   # Utility functions
│   ├── db.ts              # Database connection
│   ├── auth.ts            # Authentication utilities
│   └── types.ts           # TypeScript definitions
└── hooks/                 # Custom React hooks
```

## 🔐 Authentication

The platform uses JWT-based authentication with role-based access control:

- **CUSTOMER**: Can browse vendors, place orders, write reviews
- **VENDOR**: Can manage store, products, and orders
- **ADMIN**: Full platform oversight and management

## 📊 Database Schema

The application uses Prisma ORM with the following main models:

- **User**: User accounts and authentication
- **Vendor**: Vendor store information
- **Product**: Product catalog
- **Order**: Customer orders
- **Delivery**: Delivery tracking
- **Review**: Customer reviews and ratings
- **Category**: Product categories
- **CartItem**: Shopping cart items

## 🎨 UI Components

Built with shadcn/ui components for a modern, accessible interface:

- Forms, buttons, cards, modals
- Data tables and pagination
- Navigation and tabs
- Alerts and notifications
- Loading states and skeletons

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts for all screen sizes
- Optimized performance for mobile devices

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Export static files
npm run deploy:github
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue on GitHub.