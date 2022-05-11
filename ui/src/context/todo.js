import { createContext, useEffect, useReducer } from 'react';
import { reducer } from '../reducer/todo';

export const TodoContext = createContext();

const initialState = {
  todos: [],
  isLoading: false,
  error: '',
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getTodos = async () => {
    try {
      dispatch({ type: 'RESET_ERROR' });
      dispatch({ type: 'SET_LOADING' });
      const res = await fetch('/api/todos');
      const data = await res.json();

      if (data.error) {
        dispatch({ type: 'SET_ERROR', payload: data.error });
      } else {
        dispatch({ type: 'SET_TODOS', payload: data });
      }
    } catch (err) {
      console.log(err.message);
      dispatch({ type: 'RESET_TODOS' });
    } finally {
      dispatch({ type: 'RESET_LOADING' });
    }
  };

  const deleteTodo = async id => {
    try {
      const res = await fetch(`api/todos/${id}`, {
        method: 'DELETE',
      });
      const { error, ok } = await res.json();

      if (ok) {
        return dispatch({ type: 'DELETE_TODO', payload: id });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const createTodo = async text => {
    try {
      const res = await fetch(`api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (!data.error) {
        return dispatch({ type: 'CREATE_TODO', payload: data });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <TodoContext.Provider value={{ ...state, getTodos, deleteTodo, createTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
