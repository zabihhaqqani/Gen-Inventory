import axios from "axios";

const apiEndpoint =
  "https://7f9a6a45-68a8-472d-ac44-ff704d9ded5c-00-2n8rzw8p3sn1c.pike.replit.dev/api/items";

export const fetchItems = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await axios.get(apiEndpoint);
    dispatch({ type: "FETCH_ITEMS_DATA", payload: response.data.items });
  } catch (error) {
    dispatch({ type: "ERROR_FETCHING_DATA" });

    console.error("Error while fetching  data", error);
  }
};

export const addItem = (itemDetails) => async (dispatch) => {
  try {
    const response = await axios.post(apiEndpoint, itemDetails);
    dispatch({
      type: "ADD_ITEM",
      payload: response.data.newItem,
    });
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const deleteItem = (itemId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/${itemId}`);
    dispatch({
      type: "DELETE_ITEM",
      payload: itemId,
    });
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const updateItem = (itemId, updatedItem) => async (dispatch) => {
    try {
      const response = await axios.post(`${apiEndpoint}/${itemId}`, updatedItem);
      dispatch({
        type: "UPDATE_ITEM",
        payload: response.data.updatedItem,
      });
    } catch (error) {
      dispatch({
        type: "ERROR_UPDATING_ITEM",
        payload: error.message,
      });
      console.error("Error updating item", error);
    }
  };
  
