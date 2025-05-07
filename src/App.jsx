import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

// Main App component serving as the root of the application
function App() {
  return (
    // Wrap the app with ProductProvider to provide product context
    <ProductProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </ProductProvider>
  );
}

// Export the App component as the default export
export default App;