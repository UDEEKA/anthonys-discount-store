# Instant Sip Shop - Premium Premix Packets

A modern e-commerce website for Anthony's Discount Store, specializing in premium premix packets like Nescafe, Nestea, Nestomalt, Milo, and more. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Product Catalog**: Showcase premium premix packets with images, pricing, and descriptions
- **Shopping Cart**: Add products, adjust quantities, and manage your order
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works beautifully on all device sizes
- **Animated UI**: Smooth animations and transitions for enhanced user experience
- **Order Form**: Simple checkout process with customer details collection

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **State Management**: React Context API and useReducer
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Dependencies

Key dependencies include:
- `@radix-ui/react-*` - UI primitives
- `react-router-dom` - Routing
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `next-themes` - Theme management
- `@hookform/resolvers` & `zod` - Form validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd instant-sip-shop-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ProductCard.tsx # Product display component
│   ├── CartDrawer.tsx  # Shopping cart drawer
│   └── ThemeToggle.tsx # Theme switcher
├── data/               # Static data files
│   └── products.ts     # Product catalog
├── hooks/              # Custom React hooks
│   ├── useCart.tsx     # Cart state management
│   └── useTheme.tsx    # Theme management
├── pages/              # Page components
│   ├── Index.tsx       # Main landing page
│   └── NotFound.tsx    # 404 page
├── types/              # TypeScript types
└── App.tsx             # Main application component
```

## 🎨 Design System

The project uses a custom design system with:
- **Primary Color**: Red (#f43f5e)
- **Border Radius**: 0.75rem
- **Gradients**: Custom red/black gradients
- **Shadows**: Custom shadow definitions
- **Dark Mode**: Full dark mode support with automatic system preference detection

## 🛒 Shopping Experience

1. Browse products on the homepage
2. Add items to cart using the "Add to Cart" button
3. Open the cart drawer to review items
4. Adjust quantities or remove items
5. Proceed to checkout with the order form
6. Submit order with customer details

## 🌙 Theme Management

The website supports three theme modes:
- Light mode
- Dark mode
- System preference (default)

Users can toggle themes using the theme switcher in the header.

## 📱 Responsive Features

- Mobile-first design approach
- Responsive grid layouts
- Touch-friendly interactions
- Adaptive component sizing

## 🎯 Key Components

### ProductCard
- Displays product information with image, name, weight, and pricing
- Shows discount percentage when applicable
- Add to cart functionality
- Hover animations and 3D effects

### CartDrawer
- Slide-out cart interface
- Item quantity adjustment
- Real-time total calculation
- Order form integration

### ThemeToggle
- Simple theme switching button
- Animated sun/moon icons
- Accessible with proper ARIA labels

## 📞 Contact Information

For questions or support:
- Phone: 0769065675, 0715593003
- Email: nescafrent@gmail.com
- Address: 415/D, Podiveekumbura, Ragama
- Facebook: [Anthony's Discount Store](https://www.facebook.com/share/19jQ4vV7Vx/)

## 📄 License

This project is proprietary to Anthony's Discount Store.

## 🙏 Acknowledgments

- Product images and branding are property of their respective owners
- Built with modern web technologies for optimal performance