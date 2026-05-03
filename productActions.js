export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock products data with images
      const mockProducts = [
        {
          id: 1,
          name: 'Laptop',
          price: 999.99,
          category: 'electronics',
          description: 'High-performance laptop for work and gaming',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
        },
        {
          id: 2,
          name: 'T-Shirt',
          price: 19.99,
          category: 'clothing',
          description: 'Comfortable cotton t-shirt',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          name: 'Book',
          price: 29.99,
          category: 'books',
          description: 'Interesting novel about technology',
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop'
        }
      ];
      
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: mockProducts
      });
      
      return mockProducts;
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: error.message
      });
      throw error;
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    dispatch({ type: 'ADD_PRODUCT_REQUEST' });
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new product with ID
      const newProduct = {
        ...product,
        id: Date.now(), // Simple ID generation
        price: parseFloat(product.price)
      };
      
      dispatch({
        type: 'ADD_PRODUCT_SUCCESS',
        payload: newProduct
      });
      
      return newProduct;
    } catch (error) {
      dispatch({
        type: 'ADD_PRODUCT_FAILURE',
        payload: error.message
      });
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({
        type: 'DELETE_PRODUCT_SUCCESS',
        payload: productId
      });
      
      return productId;
    } catch (error) {
      dispatch({
        type: 'DELETE_PRODUCT_FAILURE',
        payload: error.message
      });
      throw error;
    }
  };
};
