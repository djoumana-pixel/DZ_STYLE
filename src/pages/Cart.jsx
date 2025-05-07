import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { ProductContext } from '../context/ProductContext.jsx';

// Cart component to display and manage cart items
const Cart = () => {
    // Access cart state and dispatch function from CartContext
    const { cart, dispatch } = useContext(CartContext);
    // Access products state and setter from ProductContext
    const { products, setProducts } = useContext(ProductContext);
    // State to manage checkout success message
    const [message, setMessage] = useState('');

    // Update item quantity or remove if quantity becomes 0
    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
        }
    };

    // Handle checkout process: update product sales, clear cart, and show message
    const handleCheckout = () => {
        if (cart.length === 0) return;

        // Update sold quantity for purchased products
        setProducts(prevProducts =>
            prevProducts.map(product => {
                const cartItem = cart.find(item => item.id === product.id);
                if (cartItem) {
                    return { ...product, sold: product.sold + cartItem.quantity };
                }
                return product;
            })
        );

        // Clear the cart
        dispatch({ type: 'CLEAR_CART' });
        // Display success message
        setMessage('Purchase completed!');
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    };

    // Calculate total cart value
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        // Container for the cart page
        <div className="container mx-auto p-6">
            {/* Page title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
            {/* Display success message if present */}
            {message && (
                <p className="text-green-600 font-semibold mb-4">{message}</p>
            )}
            {/* Display empty cart message or cart items */}
            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {/* Render each cart item */}
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b py-4 bg-white rounded-lg p-4 shadow-sm"
                        >
                            {/* Item details */}
                            <div>
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600">{item.price} DZD x {item.quantity}</p>
                            </div>
                            {/* Quantity controls and remove button */}
                            <div className="flex items-center gap-3">
                                {/* Decrease quantity button */}
                                <button
                                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                {/* Display current quantity */}
                                <span className="text-gray-800">{item.quantity}</span>
                                {/* Increase quantity button */}
                                <button
                                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                                {/* Remove item button */}
                                <button
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Total and checkout section */}
                    <div className="mt-6 text-right">
                        {/* Display total cart value */}
                        <p className="text-2xl font-bold text-gray-800">Total: {total} DZD</p>
                        {/* Checkout button */}
                        <button
                            className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export the Cart component for use in other parts of the application
export default Cart;