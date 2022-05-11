export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'RESET_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'RESET_TODOS':
      return {
        ...state,
        todos: [],
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESET_ERROR':
      return {
        ...state,
        error: '',
      };
    case 'CREATE_TODO':
      return {
        ...state,
        todos: [...state.todos, { ...action.payload }],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t._id !== action.payload),
      };
    default:
      throw new Error('No such action.');
  }
};
