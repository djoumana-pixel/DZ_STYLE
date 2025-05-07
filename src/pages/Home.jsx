import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItemCard from '../components/ItemCard.jsx';
import { products } from '../data/products.js';

// Home component to display the product listing page
const Home = () => {
  // Initialize state with the imported products data
  const [productList] = useState(products);
  // Access the current URL location for search query
  const location = useLocation();
  // Extract search query from URL parameters, default to empty string
  const searchQuery = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

  // Filter products based on search query
  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    // Container for the home page
    <div className="container mx-auto p-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
      {/* Grid layout for product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render ItemCard for each filtered product */}
        {filteredProducts.map(product => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Export the Home component for use in other parts of the application
export default Home;