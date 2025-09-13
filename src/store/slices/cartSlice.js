import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  loading: false,
  error: null,
};

const calculateCartTotals = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5.99 : 0; // Example shipping calculation
  const tax = subtotal * 0.1; // Example tax 10%
  const total = subtotal + shipping + tax;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or update quantity if already exists
    addToCart: (state, action) => {
      const { id, ...item } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        state.items[existingItemIndex].quantity += item.quantity || 1;
      } else {
        // Add new item
        state.items.push({ id, quantity: 1, ...item });
      }

      // Recalculate totals
      const totals = calculateCartTotals(state.items);
      return { ...state, ...totals };
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate totals
      const totals = calculateCartTotals(state.items);
      return { ...state, ...totals };
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1

        // Recalculate totals
        const totals = calculateCartTotals(state.items);
        return { ...state, ...totals };
      }
    },

    // Clear the entire cart
    clearCart: (state) => {
      return { ...initialState };
    },

    // Set cart loading state
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set cart error
    setCartError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear cart error
    clearCartError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartLoading,
  setCartError,
  clearCartError,
} = cartSlice.actions;

// Thunks
export const fetchCart = () => async (dispatch) => {
  try {
    dispatch(setCartLoading(true));
    // Replace with actual API call
    // const response = await cartApi.getCart();
    // dispatch(setCart(response.data));
  } catch (error) {
    dispatch(setCartError(error.message));
  } finally {
    dispatch(setCartLoading(false));
  }
};

export const addItemToCart = (item) => async (dispatch) => {
  try {
    dispatch(setCartLoading(true));
    // Replace with actual API call
    // await cartApi.addToCart(item.id, item.quantity);
    dispatch(addToCart(item));
  } catch (error) {
    dispatch(setCartError(error.message));
  } finally {
    dispatch(setCartLoading(false));
  }
};

export const updateItemQuantity = (itemId, quantity) => async (dispatch) => {
  try {
    dispatch(setCartLoading(true));
    // Replace with actual API call
    // await cartApi.updateCartItem(itemId, quantity);
    dispatch(updateQuantity({ id: itemId, quantity }));
  } catch (error) {
    dispatch(setCartError(error.message));
  } finally {
    dispatch(setCartLoading(false));
  }
};

export const removeItemFromCart = (itemId) => async (dispatch) => {
  try {
    dispatch(setCartLoading(true));
    // Replace with actual API call
    // await cartApi.removeFromCart(itemId);
    dispatch(removeFromCart(itemId));
  } catch (error) {
    dispatch(setCartError(error.message));
  } finally {
    dispatch(setCartLoading(false));
  }
};

export default cartSlice.reducer;
