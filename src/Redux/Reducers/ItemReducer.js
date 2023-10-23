const initialState = {
  itemsData: [],
  error: null,
  loading: false,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_ITEMS_DATA":
      return {
        ...state,
        itemsData: action.payload,
        loading: false,
      };
    case "ADD_ITEM":
      return {
        ...state,
        itemsData: [...state.itemsData, action.payload],
        loading: false,
      };
    case "DELETE_ITEM":
      const deletedItems = state.itemsData.filter(
        (item) => item?._id !== action.payload
      );

      return {
        ...state,
        itemsData: deletedItems,
        loading: false,
      };
    case "UPDATE_ITEM":
      const updatedItems = state.itemsData.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
    
      return {
        ...state,
        itemsData: updatedItems,
        loading: false,
      };
    case "ERROR_FETCHING_DATA":
      return {
        ...state,
        error: "Error Fetching Data! Please try again Later",
      };
  
    
    default:
      return state;
  }
};
