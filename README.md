# NØRTH — Streetwear E-commerce

A modern, responsive streetwear e-commerce application built with **React, TypeScript, and Vite**.

NØRTH is a frontend project focused on creating a clean shopping experience, reusable components, predictable state management, and a scalable architecture.

The application features a minimalist visual identity inspired by contemporary streetwear, with a black-and-white palette and neon accents.

## Features

### Product Catalog

- Product listings organized by category
- Featured products section
- Individual product detail pages
- Product images, descriptions, prices, and available sizes
- Product availability and quantity selection

### Shopping Cart

- Add products with selected sizes and quantities
- Update product quantities
- Remove individual items
- Clear the entire cart
- Automatically calculated subtotal
- Dynamic cart counter in the navigation bar
- Cart persistence using `localStorage`

### Navigation & UI

- Client-side routing with React Router
- Responsive layouts
- Reusable components
- Component-scoped styling with Sass Modules
- Icons powered by Lucide React

## Tech Stack

| Technology     | Purpose                              |
| -------------- | ------------------------------------ |
| React 19       | User interface                       |
| TypeScript     | Static typing                        |
| Vite 8         | Development server and build tooling |
| React Router 7 | Client-side navigation               |
| Context API    | Global state sharing                 |
| useReducer     | Shopping cart state management       |
| Sass Modules   | Component-level styling              |
| Lucide React   | Icons                                |
| localStorage   | Client-side cart persistence         |

## Project Structure

```text
src/
├── components/
│   ├── CategoriesSection/
│   ├── CategoryCard/
│   ├── FeaturedProducts/
│   ├── Hero/
│   ├── Navbar/
│   ├── ProductCard/
│   └── ProductGrid/
├── context/
│   ├── CartProvider.tsx
│   └── cartContext.tsx
├── data/
│   ├── categories.ts
│   └── products.ts
├── hooks/
│   └── useCart.tsx
├── pages/
│   ├── Cart/
│   ├── CategoryPage/
│   ├── Home/
│   └── ProductDetail/
├── reducers/
│   └── cartReducer.ts
├── styles/
│   ├── _variables.scss
│   └── global.scss
├── types/
│   ├── cart.ts
│   ├── category.ts
│   └── product.ts
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js compatible with Vite 8 (Node.js 20.19+ or 22.12+)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/DanielDiSalvo/N-RTH-ecommerce.git
cd N-RTH-ecommerce
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, typically:

`http://localhost:5173`

## Available Scripts

| Command           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Vite development server                   |
| `npm run build`   | Run TypeScript checks and create a production build |
| `npm run preview` | Preview the production build locally                |
| `npm run lint`    | Run ESLint                                          |

## Shopping Cart Architecture

The shopping cart is implemented using **React Context API and `useReducer`**, separating state transitions from the UI.

The architecture consists of:

- **CartContext:** Defines the shared cart interface.
- **CartProvider:** Manages cart state, exposes actions, and handles persistence.
- **cartReducer:** Processes cart actions through predictable state transitions.
- **useCart:** Provides a reusable hook for accessing the cart.

Supported actions:

```typescript
ADD_ITEM;
REMOVE_ITEM;
UPDATE_QUANTITY;
CLEAR_CART;
```

### Cart Persistence

Cart data is stored in the browser's `localStorage` and restored when the application initializes.

This allows users to maintain their cart across page reloads within the same browser and origin.

The current implementation stores product data client-side. A future backend integration will provide authoritative pricing and inventory validation.

## Product Data

The current product catalog uses locally defined mock data.

Products include information such as:

- Unique identifier
- Name and description
- Price and category
- Product images
- Available sizes and colors
- Stock quantity
- Featured status

This structure is intended to support a future migration to Cloud Firestore.

## Roadmap

The following features are planned for future development:

- [x] Product catalog and categories
- [x] Product detail pages
- [x] Shopping cart with Context API and useReducer
- [x] Cart persistence with localStorage
- [ ] Product search and filtering
- [ ] Mobile navigation menu
- [ ] User authentication with Firebase Authentication
- [ ] Product and order management with Cloud Firestore
- [ ] Product image management with Firebase Storage
- [ ] Checkout flow
- [ ] Order history
- [ ] Admin dashboard
- [ ] Automated CI/CD and deployment

## Deployment

NØRTH is designed to be deployed as a Vite single-page application.

A Vercel deployment with GitHub integration is planned, including automated production deployments and preview deployments for pull requests.

## Project Goals

NØRTH serves as both a portfolio project and a practical example of modern React application development.

The main goals are to demonstrate:

- Component composition and reusability
- Type-safe frontend development
- Separation of concerns
- Global state management
- Reducer-based state transitions
- Client-side persistence
- Scalable project organization

## Author

**Daniel Di Salvo**

Senior Frontend Developer | React · TypeScript · React Native

[GitHub](https://github.com/DanielDiSalvo)

---

Built with React, TypeScript, and a passion for frontend development.

**NØRTH — Beyond Limits.**
