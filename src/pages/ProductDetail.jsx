import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { ProductContext } from '../context/ProductContext.jsx';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, setProducts } = useContext(ProductContext);
    const { dispatch } = useContext(CartContext);
    const product = products.find(p => p.id === parseInt(id));
    const hasIncremented = useRef(false);

    useEffect(() => {
        if (product && !hasIncremented.current) {
            setProducts(prevProducts =>
                prevProducts.map(p =>
                    p.id === parseInt(id) ? { ...p, views: (p.views + 1/2) } : p
                )
            );
            hasIncremented.current = true;
        }
        return () => {
            hasIncremented.current = false;
        };
    }, [id]);

    if (!product) return <div className="container mx-auto p-6">Product not found</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full lg:w-1/2 h-96 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-2xl text-gray-600 mt-2">{product.price} DZD</p>
                    <p className="text-gray-500 mt-2">Views: {product.views}</p>
                    <p className="text-gray-500">Sold: {product.sold}</p>
                    <button
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                    >
                        Add to Cart
                    </button>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
                        {product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <div key={index} className="mt-3 border-t pt-2">
                                    <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
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

export default ProductDetail;