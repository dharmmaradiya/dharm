export const login = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Read users from db.json (in a real app, this would be an API call)
      const users = [
        {
          id: 1,
          username: "admin",
          email: "admin@example.com",
          password: "admin123"
        },
        {
          id: 2,
          username: "user",
          email: "user@example.com",
          password: "user123"
        }
      ];
      
      // Validate credentials against db.json data
      const user = users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      );
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: userWithoutPassword
        });
        
        return userWithoutPassword;
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message
      });
      throw error;
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' });
  };
};
