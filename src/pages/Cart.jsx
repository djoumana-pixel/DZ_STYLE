import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { ProductContext } from '../context/ProductContext.jsx';

const Cart = () => {
    const { cart, dispatch } = useContext(CartContext);
    const { products, setProducts } = useContext(ProductContext);
    const [message, setMessage] = useState('');

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;

        setProducts(prevProducts =>
            prevProducts.map(product => {
                const cartItem = cart.find(item => item.id === product.id);
                if (cartItem) {
                    return { ...product, sold: product.sold + cartItem.quantity };
                }
                return product;
            })
        );

        dispatch({ type: 'CLEAR_CART' });
        setMessage('Purchase completed!');
        setTimeout(() => setMessage(''), 3000);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
            {message && (
                <p className="text-green-600 font-semibold mb-4">{message}</p>
            )}
            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b py-4 bg-white rounded-lg p-4 shadow-sm"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600">{item.price} DZD x {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="text-gray-800">{item.quantity}</span>
                                <button
                                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                                <button
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 text-right">
                        <p className="text-2xl font-bold text-gray-800">Total: {total} DZD</p>
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

export default Cart;