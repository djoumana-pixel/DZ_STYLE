# Algerian Clothing Store

## Project Description

This is a React-based e-commerce application for an Algerian clothing store, developed for the Web Application Development course at Algiers University Benyoucef Benkhedda. The app allows users to browse traditional Algerian clothing, view detailed product information, manage a shopping cart, and search for products. It tracks product metrics such as views, items sold, and customer reviews, with a modern and responsive design powered by Tailwind CSS.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd algerian-clothing-store
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

## Features Implemented

### Required Features

- **Homepage**: Displays products in a responsive grid layout using ItemCard components.
- **Product Details Page**: Shows detailed product information, including image, name, price (in DZD), views, sold count, and reviews. Views increment automatically.
- **Shopping Cart**: Allows users to view, add, remove, and adjust item quantities. Displays total cart value in DZD.
- **Navigation**: Includes a navbar with a cart icon showing the number of items.
- **State Management**: Uses useReducer for cart operations and Context API for state sharing.
- **Dynamic Routing**: Uses react-router-dom for product details page (`/product/:id`).

### Bonus Features

- **Search Bar**: Filters products by name in real-time.
- **Responsive Design**: Tailwind CSS ensures a mobile-friendly layout with smooth transitions.
- **New Arrival Badge**: Displays on products with fewer than 10 views.
- **Persistent Cart**: Saves cart items in localStorage for persistence across page refreshes.

## Notes

- Product images use placeholders (`https://via.placeholder.com/300x400?text=<ProductName>`).
- Product data is stored in-memory but persists views and cart state via localStorage.
- Styling uses Tailwind CSS with Google Fonts (Roboto) for a professional look.
- The project is structured for scalability with separate components, context, and pages.
