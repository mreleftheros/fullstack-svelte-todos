import { createContext, useEffect, useReducer } from 'react';
import { reducer } from '../reducer/auth';

export const AuthContext = createContext();

const initialState = {
  user: null,
  loading: false
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('effect');
  }, []);

  const getUser = async () => {
    try {
      await fetch('/auth/me')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
