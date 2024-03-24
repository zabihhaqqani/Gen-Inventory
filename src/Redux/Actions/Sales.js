import axios from "axios";

const apiEndpoint =
  "https://7f9a6a45-68a8-472d-ac44-ff704d9ded5c-00-2n8rzw8p3sn1c.pike.replit.dev/api/sales";

export const fetchSales= () => async (dispatch) => {
  try {
    const response = await axios.get(apiEndpoint);
    dispatch({ type: "FETCH_SALES_DATA", payload: response.data.allSales });
  } catch (error) {
    console.error("Error while fetching exercise data", error);
  }
};

export const addSale = (saleDetails) => async (dispatch) => {
  try {
    const response = await axios.post(apiEndpoint, saleDetails);
    dispatch({
      type: "ADD_SALE",
      payload: response.data.newSale,
    });
  } catch (error) {
    console.error("Error fetching data", error);
  }
};
