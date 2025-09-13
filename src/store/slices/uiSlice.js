import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Mobile menu state
  isMobileMenuOpen: false,

  // Modal states
  modals: {
    cart: {
      isOpen: false,
    },
    search: {
      isOpen: false,
    },
    auth: {
      isOpen: false,
      view: "login", // 'login' or 'register'
    },
    productQuickView: {
      isOpen: false,
      productId: null,
    },
  },

  // Notification
  notification: {
    isOpen: false,
    message: "",
    type: "success", // 'success', 'error', 'info', 'warning'
  },

  // Loading states
  loading: {
    global: false,
    buttons: {},
  },

  // Theme
  theme: "light", // 'light' or 'dark'
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Mobile menu actions
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },

    // Modal actions
    openModal: (state, action) => {
      const { modal, data } = action.payload;
      if (state.modals[modal]) {
        state.modals[modal] = { ...state.modals[modal], isOpen: true, ...data };
      }
    },
    closeModal: (state, action) => {
      const modal = action.payload;
      if (state.modals[modal]) {
        state.modals[modal] = { ...initialState.modals[modal] };
      }
    },

    // Auth modal view
    setAuthModalView: (state, action) => {
      if (state.modals.auth) {
        state.modals.auth.view = action.payload;
      }
    },

    // Notification actions
    showNotification: (state, action) => {
      state.notification = {
        isOpen: true,
        type: action.payload.type || "info",
        message: action.payload.message,
      };
    },
    hideNotification: (state) => {
      state.notification = initialState.notification;
    },

    // Loading states
    setLoading: (state, action) => {
      const { key, isLoading } = action.payload;
      if (key === "global") {
        state.loading.global = isLoading;
      } else {
        state.loading.buttons = {
          ...state.loading.buttons,
          [key]: isLoading,
        };
      }
    },

    // Theme
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      // You can also save to localStorage here if you want to persist the theme
    },
    setTheme: (state, action) => {
      if (["light", "dark"].includes(action.payload)) {
        state.theme = action.payload;
      }
    },
  },
});

// Export actions
export const {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  openModal,
  closeModal,
  setAuthModalView,
  showNotification,
  hideNotification,
  setLoading,
  toggleTheme,
  setTheme,
} = uiSlice.actions;

// Selectors
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectModals = (state) => state.ui.modals;
export const selectNotification = (state) => state.ui.notification;
export const selectIsLoading = (state, key = "global") =>
  key === "global" ? state.ui.loading.global : state.ui.loading.buttons[key];
export const selectTheme = (state) => state.ui.theme;

export default uiSlice.reducer;
