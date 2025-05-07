import { createContext, useEffect, useReducer } from 'react';

// Create a context for managing cart state
export const CartContext = createContext();

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        // Add item to cart or increment quantity if item exists
        case 'ADD_TO_CART':
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        // Remove item from cart by ID
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload);
        // Update quantity of an item in the cart
        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        // Clear all items from the cart
        case 'CLEAR_CART':
            return [];
        // Return current state for unrecognized actions
        default:
            return state;
    }
};

// CartProvider component to wrap the app and provide cart context
export const CartProvider = ({ children }) => {
    // Initialize cart state with reducer, load from localStorage if available
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Provide cart state and dispatch function to child components
    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};