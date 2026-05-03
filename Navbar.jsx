import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const navbarStyles = `
  .navbar-custom {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
    padding: 1rem 0;
    position: relative;
    overflow: hidden;
  }
  
  .navbar-custom::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="navbar-pattern" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23navbar-pattern)"/></svg>');
    pointer-events: none;
  }
  
  .navbar-brand-custom {
    color: white !important;
    font-weight: 800;
    font-size: 1.5rem;
    text-decoration: none;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .navbar-brand-custom::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
    border-radius: 2px;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .navbar-brand-custom:hover::after {
    transform: scaleX(1);
  }
  
  .navbar-brand-custom:hover {
    transform: translateY(-2px);
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .navbar-nav-custom .nav-link-custom {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 600;
    text-decoration: none;
    padding: 0.75rem 1.5rem !important;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
    margin: 0 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }
  
  .navbar-nav-custom .nav-link-custom::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .navbar-nav-custom .nav-link-custom:hover::before {
    opacity: 1;
  }
  
  .navbar-nav-custom .nav-link-custom:hover {
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
  
  .navbar-nav-custom .nav-link-custom.active {
    color: white !important;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  }
  
  .navbar-text-custom {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 600;
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.85rem;
  }
  
  .navbar-button-logout {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
    color: white !important;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .navbar-button-logout::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  .navbar-button-logout:hover::before {
    left: 100%;
  }
  
  .navbar-button-logout:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
  
  .navbar-button-logout:active {
    transform: translateY(0);
  }
  
  .navbar-toggler-custom {
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 0.5rem;
    transition: all 0.3s ease;
  }
  
  .navbar-toggler-custom:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.1);
  }
  
  .navbar-toggler-custom:focus {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
    outline: none;
  }
  
  .navbar-toggler-icon-custom {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255%2c255%2c255%2c0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
  
  @media (max-width: 768px) {
    .navbar-custom {
      padding: 0.75rem 0;
    }
    
    .navbar-brand-custom {
      font-size: 1.25rem;
    }
    
    .navbar-nav-custom .nav-link-custom {
      padding: 0.5rem 1rem !important;
      font-size: 0.85rem;
      margin: 0.25rem 0;
    }
    
    .navbar-text-custom {
      font-size: 0.75rem;
      margin-right: 0.5rem;
      padding: 0.4rem 0.8rem;
    }
    
    .navbar-button-logout {
      font-size: 0.75rem;
      padding: 0.4rem 1rem;
    }
  }
`;

// Inject styles
const navbarStyleSheet = document.createElement("style");
navbarStyleSheet.innerText = navbarStyles;
document.head.appendChild(navbarStyleSheet);

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand navbar-brand-custom" to="/">
          Product Manager
        </Link>
        
        <button
          className="navbar-toggler navbar-toggler-custom"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon navbar-toggler-icon-custom"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto navbar-nav-custom">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/add-product">
                    Add Product
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          <ul className="navbar-nav navbar-nav-custom">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text navbar-text-custom">
                    Welcome, {user?.username}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="navbar-button-logout" onClick={handleLogout}>
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;