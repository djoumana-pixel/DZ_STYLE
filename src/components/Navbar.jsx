import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Algerian Clothing Store
        </Link>
        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="px-3 py-2 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
              Search
            </button>
          </form>
          <Link to="/cart" className="relative hover:text-blue-200 transition">
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;