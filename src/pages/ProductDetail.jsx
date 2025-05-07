import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { ProductContext } from '../context/ProductContext.jsx';

// ProductDetail component to display detailed information about a single product
const ProductDetail = () => {
    // Extract product ID from URL parameters
    const { id } = useParams();
    // Access products state and setter from ProductContext
    const { products, setProducts } = useContext(ProductContext);
    // Access dispatch function from CartContext
    const { dispatch } = useContext(CartContext);
    // Find the product matching the ID
    const product = products.find(p => p.id === parseInt(id));
    // Ref to track if view count has been incremented
    const hasIncremented = useRef(false);

    // Effect to increment product views on first render
    useEffect(() => {
        if (product && !hasIncremented.current) {
            // Update product views by incrementing by 0.5
            setProducts(prevProducts =>
                prevProducts.map(p =>
                    p.id === parseInt(id) ? { ...p, views: (p.views + 1/2) } : p
                )
            );
            // Mark views as incremented
            hasIncremented.current = true;
        }
        // Cleanup function to reset hasIncremented on unmount
        return () => {
            hasIncremented.current = false;
        };
    }, [id]);

    // Handle case where product is not found
    if (!product) return <div className="container mx-auto p-6">Product not found</div>;

    return (
        // Container for the product detail page
        <div className="container mx-auto p-6">
            {/* Product details layout */}
            <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
                {/* Product image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full lg:w-1/2 h-96 object-cover rounded-lg"
                />
                {/* Product information */}
                <div className="flex-1">
                    {/* Product name */}
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    {/* Product price */}
                    <p className="text-2xl text-gray-600 mt-2">{product.price} DZD</p>
                    {/* Product views */}
                    <p className="text-gray-500 mt-2">Views: {product.views}</p>
                    {/* Product sold count */}
                    <p className="text-gray-500">Sold: {product.sold}</p>
                    {/* Add to cart button */}
                    <button
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                    >
                        Add to Cart
                    </button>
                    {/* Reviews section */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
                        {/* Display reviews if available */}
                        {product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <div key={index} className="mt-3 border-t pt-2">
                                    {/* Review rating as stars */}
                                    <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                                    {/* Review comment */}
                                    <p className="text-gray-600">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 mt-2">No reviews yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the ProductDetail component for use in other parts of the application
export default ProductDetail;