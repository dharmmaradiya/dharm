import React, { useReducer, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const loginStyles = `
  .login-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  
  .login-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="50" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="30" r="0.5" fill="white" opacity="0.1"/><circle cx="30" cy="90" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
  
  .login-card {
    border: none;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(50, 50, 93, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: translateY(0);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
    max-width: 450px;
    width: 100%;
  }
  
  .login-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 70px rgba(50, 50, 93, 0.2), 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .login-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 2.5rem;
    text-align: center;
    position: relative;
  }
  
  .login-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
  }
  
  .login-header h3 {
    color: white;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-size: 2rem;
    letter-spacing: 1px;
  }
  
  .login-body {
    padding: 3rem;
    background: white;
  }
  
  .login-form-group {
    margin-bottom: 2rem;
    position: relative;
  }
  
  .login-label {
    color: #4a5568;
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .login-input {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f7fafc;
    width: 100%;
    box-sizing: border-box;
  }
  
  .login-input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
    background: white;
    outline: none;
  }
  
  .login-input::placeholder {
    color: #a0aec0;
    font-style: italic;
  }
  
  .login-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    padding: 1rem 2.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    width: 100%;
    font-size: 1.1rem;
    position: relative;
    overflow: hidden;
  }
  
  .login-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  .login-button:hover::before {
    left: 100%;
  }
  
  .login-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
  }
  
  .login-button:active {
    transform: translateY(-1px);
  }
  
  .login-button:disabled {
    opacity: 0.7;
    transform: none;
    cursor: not-allowed;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
  
  .login-error {
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #f56565 0%, #ed64a6 100%);
    color: white;
    font-weight: 600;
    padding: 1.25rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 25px rgba(245, 101, 101, 0.3);
    text-align: center;
    animation: shake 0.5s ease-in-out;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  .login-spinner {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    display: inline-block;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .login-forgot-password {
    text-align: center;
    margin-top: 1.5rem;
  }
  
  .login-forgot-password a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .login-forgot-password a:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = loginStyles;
document.head.appendChild(styleSheet);

const initialState = {
  username: '', password: '', error: '', loading: false
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD': return { ...state, [action.field]: action.value };
    case 'SET_ERROR': return { ...state, error: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const handleChange = useCallback((e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: '' });

    try {
      await reduxDispatch(login({
        username: state.username,
        password: state.password
      }));
      navigate('/products');
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid username or password' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state, reduxDispatch, navigate]);

  return (
    <div className="login-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card login-card">
              <div className="card-header login-header">
                <h3 className="text-center">Login</h3>
              </div>
              <div className="card-body login-body">
                {state.error && <div className="login-error">{state.error}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="login-form-group">
                    <label htmlFor="username" className="login-label">Username</label>
                    <input
                      type="text"
                      className="login-input"
                      id="username"
                      name="username"
                      value={state.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="login-form-group">
                    <label htmlFor="password" className="login-label">Password</label>
                    <input
                      type="password"
                      className="login-input"
                      id="password"
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="login-button"
                      disabled={state.loading}
                    >
                      {state.loading ? 'Logging in...' : 'Login'}
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

export default Login;