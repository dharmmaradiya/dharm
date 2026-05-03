import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/actions/productActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const productItemStyles = `
  .product-item-card {
    border: none;
    border-radius: 25px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    backdrop-filter: blur(10px);
  }
  
  .product-item-card::before {
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
  
  .product-item-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.18);
  }
  
  .product-item-card:hover::before {
    opacity: 1;
  }
  
  .product-item-image-container {
    position: relative;
    overflow: hidden;
    height: 160px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }
  
  .product-item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(1.05);
  }
  
  .product-item-card:hover .product-item-image {
    transform: scale(1.1) rotate(1deg);
    filter: brightness(1.1) saturate(1.2);
  }
  
  .product-item-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .product-item-card:hover .product-item-image-overlay {
    opacity: 1;
  }
  
  .product-item-body {
    padding: 1.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
    position: relative;
  }
  
  .product-item-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 2rem;
    right: 2rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  }
  
  .product-item-title {
    color: #1a202c;
    font-weight: 800;
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    line-height: 1.3;
    min-height: 2.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.3s ease;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .product-item-card:hover .product-item-title {
    color: #667eea;
  }
  
  .product-item-description {
    color: #4a5568;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.3s ease;
  }
  
  .product-item-card:hover .product-item-description {
    color: #2d3748;
  }
  
  .product-item-badges {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
  
  .product-item-badge {
    padding: 0.6rem 1.2rem;
    border-radius: 25px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  
  .product-item-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  .product-item-badge:hover::before {
    left: 100%;
  }
  
  .product-item-badge-price {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  .product-item-badge-price:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }
  
  .product-item-badge-category {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
  }
  
  .product-item-badge-category:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(240, 147, 251, 0.5);
  }
  
  .product-item-footer {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 1rem 1.2rem;
    border-top: 1px solid #e2e8f0;
    margin-top: auto;
    position: relative;
  }
  
  .product-item-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 2rem;
    right: 2rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, #cbd5e0, transparent);
  }
  
  .product-item-button-group {
    display: flex;
    gap: 0.75rem;
    width: 100%;
  }
  
  .product-item-button {
    flex: 1;
    border: none;
    border-radius: 15px;
    padding: 0.9rem 1.2rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .product-item-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: left 0.6s ease;
  }
  
  .product-item-button::after {
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
  
  .product-item-button:active::after {
    width: 300px;
    height: 300px;
  }
  
  .product-item-button-edit {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
  }
  
  .product-item-button-edit::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  }
  
  .product-item-button-edit:hover::before {
    left: 100%;
  }
  
  .product-item-button-edit:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.5);
  }
  
  .product-item-button-delete {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(250, 112, 154, 0.4);
  }
  
  .product-item-button-delete::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  }
  
  .product-item-button-delete:hover::before {
    left: 100%;
  }
  
  .product-item-button-delete:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(250, 112, 154, 0.5);
  }
  
  .product-item-button:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  @media (max-width: 768px) {
    .product-item-card {
      margin-bottom: 1.5rem;
      border-radius: 20px;
    }
    
    .product-item-image-container {
      height: 180px;
    }
    
    .product-item-body {
      padding: 1.5rem;
    }
    
    .product-item-title {
      font-size: 1.2rem;
      min-height: 3rem;
    }
    
    .product-item-description {
      font-size: 0.9rem;
    }
    
    .product-item-badge {
      font-size: 0.75rem;
      padding: 0.5rem 1rem;
    }
    
    .product-item-footer {
      padding: 1rem 1.5rem;
    }
    
    .product-item-button {
      font-size: 0.75rem;
      padding: 0.7rem 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .product-item-card {
      margin-bottom: 1rem;
    }
    
    .product-item-body {
      padding: 1rem;
    }
    
    .product-item-title {
      font-size: 1.1rem;
    }
    
    .product-item-badge {
      font-size: 0.7rem;
      padding: 0.4rem 0.8rem;
    }
    
    .product-item-button {
      font-size: 0.7rem;
      padding: 0.6rem 0.8rem;
    }
  }
`;

// Inject styles
const productItemStyleSheet = document.createElement("style");
productItemStyleSheet.innerText = productItemStyles;
document.head.appendChild(productItemStyleSheet);

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(product.id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }, [dispatch, product.id]);

  const handleEdit = useCallback(() => {
    console.log('Edit product:', product.id);
  }, [product.id]);

  const badges = [
    { text: `$${product.price}`, class: 'bg-primary' },
    { text: product.category, class: 'bg-secondary' }
  ];

  const buttons = [
    { text: 'Edit', class: 'btn-outline-primary', onClick: handleEdit },
    { text: 'Delete', class: 'btn-outline-danger', onClick: handleDelete }
  ];

  return (
    <div className="product-item-card">
      {product.image && (
        <div className="product-item-image-container">
          <img 
            src={product.image} 
            className="product-item-image" 
            alt={product.name}
          />
          <div className="product-item-image-overlay"></div>
        </div>
      )}
      <div className="product-item-body">
        <h5 className="product-item-title">{product.name}</h5>
        <p className="product-item-description">{product.description}</p>
        <div className="product-item-badges">
          <span className="product-item-badge product-item-badge-price">
            ${product.price}
          </span>
          <span className="product-item-badge product-item-badge-category">
            {product.category}
          </span>
        </div>
      </div>
      <div className="product-item-footer">
        <div className="product-item-button-group">
          <button
            type="button"
            className="product-item-button product-item-button-edit"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="product-item-button product-item-button-delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;