import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setCredentials,
  clearError,
} = authSlice.actions;

// Thunks
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    // Replace with actual API call
    // const response = await authApi.login(credentials);
    // dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    // Replace with actual user fetch
    // const user = await authApi.getMe();
    // dispatch(setCredentials({ user, token }));
  } else {
    dispatch(logout());
  }
};

export default authSlice.reducer;
