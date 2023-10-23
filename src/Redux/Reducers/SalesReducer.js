const initialState = {
  salesData: [],
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SALES_DATA":
      return {
        ...state,
        salesData: action.payload,
      };
    case "ADD_SALE":
      return {
        ...state,
        salesData: [...state.salesData, action.payload],
      };
    default:
      return state;
  }
};
