import { createContext, useEffect, useReducer } from 'react';
import { reducer } from '../reducer/auth';

export const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const { error } = await res.json();
      if (error) {
        dispatch({type: 'RESET_USER'});
      }
    } catch (err) {
      console.log(err);
      dispatch({type: 'RESET_USER'});
    }
  };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
