import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";
import uiReducer from "./slices/uiSlice";
import categoriesReducer from "./slices/categoriesSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  ui: uiReducer,
  categories: categoriesReducer,
});

// Infer the `RootState` type from the rootReducer
export default rootReducer;
