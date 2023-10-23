import { combineReducers } from "redux";
import { itemReducer } from "./ItemReducer";
import { salesReducer } from "./SalesReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  sales:salesReducer
});

export default rootReducer;
