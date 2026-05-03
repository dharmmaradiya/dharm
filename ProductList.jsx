import React, { useReducer, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import ProductItem from './ProductItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const productListStyles = `
  .product-list-container {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    padding: 2rem 0;
  }
  
  .product-list-header {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: none;
  }
  
  .product-list-title {
    color: #2d3748;
    font-weight: 700;
    font-size: 2.5rem;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .product-list-button {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    border: none;
    border-radius: 10px;
    padding: 0.75rem 2rem;
    font-weight: 600;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .product-list-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
  }
  
  .product-list-loading {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .product-list-spinner {
    width: 3rem;
    height: 3rem;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .product-list-loading-text {
    color: #4a5568;
    font-size: 1.1rem;
    margin-top: 1rem;
    font-weight: 500;
  }
  
  .product-list-error {
    background: linear-gradient(135deg, #f56565 0%, #ed64a6 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 15px;
    text-align: center;
    font-weight: 500;
    box-shadow: 0 10px 30px rgba(245, 101, 101, 0.2);
  }
  
  .product-list-empty {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .product-list-empty-title {
    color: #4a5568;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .product-list-empty-text {
    color: #718096;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .product-list-empty-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 10px;
    padding: 1rem 2rem;
    font-weight: 600;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .product-list-empty-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  .product-list-grid {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  
  .product-list-grid::-webkit-scrollbar {
    height: 12px;
  }
  
  .product-list-grid::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .product-list-grid::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
  }
  
  .product-list-grid::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }
  
  .product-item-card {
    min-width: 280px;
    max-width: 280px;
    scroll-snap-align: start;
  }
`;

// Inject styles
const productListStyleSheet = document.createElement("style");
productListStyleSheet.innerText = productListStyles;
document.head.appendChild(productListStyleSheet);

const initialState = {
  loading: true,
  error: ''
};

const listReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload };
    default: return state;
  }
};

const ProductList = () => {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const reduxDispatch = useDispatch();
  const { products } = useSelector(state => state.products);

  const loadProducts = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: '' });

    try {
      await reduxDispatch(fetchProducts());
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load products' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [reduxDispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const LoadingSpinner = () => (
    <div className="product-list-loading">
      <div className="product-list-spinner"></div>
      <div className="product-list-loading-text">Loading products...</div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="container mt-5">
      <div className="product-list-error">
        {state.error}
      </div>
    </div>
  );

  const Header = () => (
    <div className="product-list-header">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="product-list-title">Products</h2>
        <button className="product-list-button">Add New Product</button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="product-list-empty">
      <h3 className="product-list-empty-title">No products found</h3>
      <p className="product-list-empty-text">Start by adding your first product!</p>
      <button className="product-list-empty-button">Add First Product</button>
    </div>
  );

  const ProductsGrid = () => (
    <div className="product-list-grid">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );

  if (state.loading) return <LoadingSpinner />;
  if (state.error) return <ErrorMessage />;

  return (
    <div className="product-list-container">
      <div className="container">
        <Header />
        {products && products.length > 0 ? <ProductsGrid /> : <EmptyState />}
      </div>
    </div>
  );
};

export default ProductList;