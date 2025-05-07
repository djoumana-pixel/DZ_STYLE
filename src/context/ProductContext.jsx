import { createContext, useState } from 'react';
import { products as initialProducts } from '../data/products.js';

// Create a context for managing product state
export const ProductContext = createContext();

// ProductProvider component to wrap the app and provide product context
export const ProductProvider = ({ children }) => {
    // Initialize product state with imported products data
    const [products, setProducts] = useState(initialProducts);

    // Provide products state and setter function to child components
    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};