export const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_USER':
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    default:
      throw new Error('No such action.');
  }
};
