import React, { useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/actions/productActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const productFormStyles = `
  .product-form-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
  }
  
  .product-form-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="form-pattern" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1.5" fill="white" opacity="0.1"/><rect x="5" y="5" width="20" height="20" fill="none" stroke="white" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23form-pattern)"/></svg>');
    pointer-events: none;
  }
  
  .product-form-card {
    border: none;
    border-radius: 25px;
    box-shadow: 0 25px 80px rgba(102, 126, 234, 0.4), 0 10px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.98);
    max-width: 700px;
    margin: 0 auto;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }
  
  .product-form-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .product-form-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 35px 100px rgba(102, 126, 234, 0.5), 0 15px 40px rgba(0, 0, 0, 0.2);
  }
  
  .product-form-card:hover::before {
    opacity: 1;
  }
  
  .product-form-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .product-form-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
  }
  
  .product-form-header h3 {
    color: white;
    font-weight: 800;
    margin: 0;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    font-size: 2.2rem;
    letter-spacing: 1.5px;
    position: relative;
    z-index: 1;
  }
  
  .product-form-header::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.3; }
  }
  
  .product-form-body {
    padding: 3.5rem;
    background: white;
    position: relative;
  }
  
  .product-form-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 3.5rem;
    right: 3.5rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  }
  
  .product-form-group {
    margin-bottom: 2.5rem;
    position: relative;
  }
  
  .product-form-label {
    color: #2d3748;
    font-weight: 700;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    position: relative;
    padding-left: 1rem;
  }
  
  .product-form-label::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
  }
  
  .product-form-input,
  .product-form-select,
  .product-form-textarea {
    border: 2px solid #e2e8f0;
    border-radius: 15px;
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: #f8fafc;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }
  
  .product-form-input::placeholder,
  .product-form-textarea::placeholder {
    color: #a0aec0;
    font-style: italic;
  }
  
  .product-form-input:focus,
  .product-form-select:focus,
  .product-form-textarea:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 5px rgba(102, 126, 234, 0.15);
    background: white;
    outline: none;
    transform: translateY(-2px);
  }
  
  .product-form-textarea {
    resize: vertical;
    min-height: 140px;
    font-family: inherit;
  }
  
  .product-form-select {
    cursor: pointer;
    appearance: none;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23667eea"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5rem;
    padding-right: 3rem;
  }
  
  .product-form-button-group {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-end;
    margin-top: 3rem;
  }
  
  .product-form-button {
    border: none;
    border-radius: 15px;
    padding: 1.25rem 2.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    min-width: 120px;
  }
  
  .product-form-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: left 0.6s ease;
  }
  
  .product-form-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }
  
  .product-form-button:active::after {
    width: 300px;
    height: 300px;
  }
  
  .product-form-button-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }
  
  .product-form-button-primary::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  }
  
  .product-form-button-primary:hover::before {
    left: 100%;
  }
  
  .product-form-button-primary:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
  }
  
  .product-form-button-secondary {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
  }
  
  .product-form-button-secondary::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  }
  
  .product-form-button-secondary:hover::before {
    left: 100%;
  }
  
  .product-form-button-secondary:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 15px 40px rgba(240, 147, 251, 0.5);
  }
  
  .product-form-button:disabled {
    opacity: 0.6;
    transform: none;
    cursor: not-allowed;
  }
  
  .product-form-button:disabled:hover {
    transform: none;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }
  
  .product-form-error {
    border-radius: 15px;
    border: none;
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
    color: white;
    font-weight: 600;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
    text-align: center;
    animation: shake 0.6s ease-in-out;
    position: relative;
    overflow: hidden;
  }
  
  .product-form-error::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: slideIn 2s ease-in-out infinite;
  }
  
  @keyframes slideIn {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
    20%, 40%, 60%, 80% { transform: translateX(8px); }
  }
  
  .product-form-spinner {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
    border: 3px solid transparent;
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    display: inline-block;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .product-form-container {
      padding: 1rem 0;
    }
    
    .product-form-card {
      margin: 0 1rem;
      max-width: none;
    }
    
    .product-form-header {
      padding: 2rem;
    }
    
    .product-form-header h3 {
      font-size: 1.8rem;
    }
    
    .product-form-body {
      padding: 2rem;
    }
    
    .product-form-button-group {
      flex-direction: column;
      gap: 1rem;
    }
    
    .product-form-button {
      width: 100%;
    }
  }
`;

// Inject styles
const productFormStyleSheet = document.createElement("style");
productFormStyleSheet.innerText = productFormStyles;
document.head.appendChild(productFormStyleSheet);

const initialState = {
  name: '', price: '', description: '', category: '', image: '', error: '', loading: false
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD': return { ...state, [action.field]: action.value };
    case 'SET_ERROR': return { ...state, error: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
};

const ProductForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'food', label: 'Food' },
    { value: 'books', label: 'Books' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = useCallback((e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: '' });

    try {
      await reduxDispatch(addProduct({
        name: state.name,
        price: state.price,
        description: state.description,
        category: state.category,
        image: state.image
      }));
      navigate('/products');
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add product' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state, reduxDispatch, navigate]);

  const renderField = (id, label, type, props = {}) => {
    const commonProps = {
      className: type === 'select' ? "product-form-select" : type === 'textarea' ? "product-form-textarea" : "product-form-input",
      id, name: id, value: state[id],
      onChange: handleChange, required: true, ...props
    };

    if (type === 'select') {
      return (
        <select {...commonProps}>
          {categories.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    } else if (type === 'textarea') {
      return (
        <textarea {...commonProps} placeholder={`Enter ${label.toLowerCase()}...`} />
      );
    } else {
      return (
        <input type={type} {...commonProps} placeholder={`Enter ${label.toLowerCase()}...`} />
      );
    }
  };

  return (
    <div className="product-form-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card product-form-card">
              <div className="card-header product-form-header">
                <h3>Add New Product</h3>
              </div>
              <div className="card-body product-form-body">
                {state.error && <div className="product-form-error">{state.error}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="product-form-group">
                    <label htmlFor="name" className="product-form-label">Product Name</label>
                    {renderField('name', 'Product Name', 'text')}
                  </div>
                  
                  <div className="product-form-group">
                    <label htmlFor="price" className="product-form-label">Price</label>
                    {renderField('price', 'Price', 'number', { step: '0.01', min: '0' })}
                  </div>
                  
                  <div className="product-form-group">
                    <label htmlFor="category" className="product-form-label">Category</label>
                    {renderField('category', 'Category', 'select')}
                  </div>
                  
                  <div className="product-form-group">
                    <label htmlFor="image" className="product-form-label">Image URL</label>
                    {renderField('image', 'Image URL', 'url', { required: false })}
                  </div>
                  
                  <div className="product-form-group">
                    <label htmlFor="description" className="product-form-label">Description</label>
                    {renderField('description', 'Description', 'textarea')}
                  </div>
                  
                  <div className="product-form-button-group">
                    <button 
                      type="button" 
                      className="product-form-button product-form-button-secondary"
                      onClick={() => navigate('/products')}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="product-form-button product-form-button-primary"
                      disabled={state.loading}
                    >
                      {state.loading ? (
                        <>
                          <span className="product-form-spinner"></span>
                          Adding...
                        </>
                      ) : (
                        'Add Product'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;