import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ItemCard = ({ product }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
      {product.views < 10 && (
        <span className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          New Arrival
        </span>
      )}
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">{product.price} DZD</p>
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

export default ItemCard;