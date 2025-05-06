import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItemCard from '../components/ItemCard.jsx';
import { products } from '../data/products.js';

const Home = () => {
  const [productList] = useState(products);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;