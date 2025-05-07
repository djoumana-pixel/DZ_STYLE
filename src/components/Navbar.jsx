import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

// Navbar component for site navigation and search functionality
const Navbar = () => {
  // Access the cart state from CartContext
  const { cart } = useContext(CartContext);
  // State to manage the search input value
  const [search, setSearch] = useState('');
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the home page with the search query as a URL parameter
    navigate(`/?search=${search}`);
  };

  return (
    // Navigation bar with styling and shadow
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      {/* Container for centering and spacing content */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Link to the homepage with store branding */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          DZ Style
        </Link>
        {/* Container for search form and cart link */}
        <div className="flex items-center gap-6">
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex">
            {/* Search input field */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="px-3 py-2 rounded-l-lg text-gray-800 focus:outline-none"
            />
            {/* Search button */}
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
              Search
            </button>
          </form>
          {/* Link to the cart page with item count */}
          <Link to="/cart" className="relative hover:text-blue-200 transition">
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component for use in other parts of the application
export default Navbar;