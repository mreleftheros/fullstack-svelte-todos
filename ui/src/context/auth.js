import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { reducer } from '../reducer/auth';

export const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (data.error) {
        dispatch({ type: 'RESET_USER' });
      } else {
        dispatch({
          type: 'SET_USER',
          payload: { _id: data._id, username: data.username },
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: 'RESET_USER' });
    }
  };

  const signup = async (username, password) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.error) {
        dispatch({ type: 'RESET_USER' });
      } else {
        dispatch({
          type: 'SET_USER',
          payload: { _id: data._id, username: data.username },
        });
      }

      return data;
    } catch (err) {
      console.log(err.message);
      dispatch({ type: 'RESET_USER' });
    }
  };

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.error) {
        dispatch({ type: 'RESET_USER' });
      } else {
        dispatch({
          type: 'SET_USER',
          payload: { _id: data._id, username: data.username },
        });
      }

      return data;
    } catch (err) {
      console.log(err.message);
      dispatch({ type: 'RESET_USER' });
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      const { ok } = await res.json();

      if (ok) {
        dispatch({ type: 'RESET_USER' });
        return navigate('/login');
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: 'RESET_USER' });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
