export const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_USER':
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: { ...action.payload },
      };
    default:
      throw new Error('No such action.');
  }
};
