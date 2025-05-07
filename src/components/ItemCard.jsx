import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// ItemCard component to display individual product details
const ItemCard = ({ product }) => {
  // Access the dispatch function from CartContext to modify the cart
  const { dispatch } = useContext(CartContext);

  return (
    // Container for the product card with hover scaling effect
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
      {/* Display 'New Arrival' badge for products with fewer than 10 views */}
      {product.views < 10 && (
        <span className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          New Arrival
        </span>
      )}
      {/* Link to the product details page */}
      <Link to={`/product/${product.id}`}>
        {/* Product image with fixed height and object-cover for consistent display */}
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      </Link>
      {/* Product details section */}
      <div className="p-4">
        {/* Product name */}
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        {/* Product price in DZD */}
        <p className="text-gray-600">{product.price} DZD</p>
        {/* Button to add the product to the cart */}
        <button
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Export the ItemCard component for use in other parts of the application
export default ItemCard;