import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import rootReducer from "./root-reducers";

// ----------------------------------------------------------------------

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values
      immutableCheck: false, // Disable immutable check for performance
    }),
});

// Typed hooks for useSelector and useDispatch
const useDispatch = () => useAppDispatch(); // Typed useDispatch
const useSelector = useAppSelector; // Typed useSelector

// Destructure dispatch from the store
const { dispatch } = store;

// Export everything
export { dispatch, store, useDispatch, useSelector };
