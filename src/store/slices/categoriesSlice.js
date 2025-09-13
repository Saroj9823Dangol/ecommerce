import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "lib/axios";

// Initial state
const initialState = {
  categories: [],
  featuredCategories: [],
  loading: false,
  featuredLoading: false,
  error: null,
  selectedCategory: null,
};

// Async Thunks
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async ({ params }, { rejectWithValue }) => {
    try {
      const res = await api.get("/categories", {
        params,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeaturedCategories = createAsyncThunk(
  "categories/fetchFeaturedCategories",
  async ({ params }, { rejectWithValue }) => {
    try {
      const res = await api.get("/categories", {
        params,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload || [];
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch categories";
    });

    // Fetch Featured Categories
    builder.addCase(fetchFeaturedCategories.pending, (state) => {
      state.featuredLoading = true;
      state.error = null;
    });
    builder.addCase(fetchFeaturedCategories.fulfilled, (state, action) => {
      console.log(action.payload, "action.payload");
      state.featuredLoading = false;
      state.featuredCategories = action.payload || [];
    });
    builder.addCase(fetchFeaturedCategories.rejected, (state, action) => {
      state.featuredLoading = false;
      state.error = action.payload || "Failed to fetch featured categories";
    });
  },
});

// Export actions
export const { setSelectedCategory, clearSelectedCategory, clearError } =
  categoriesSlice.actions;

// Selectors
export const selectAllCategories = (state) => state.categories.categories;
export const selectFeaturedCategories = (state) =>
  state.categories.featuredCategories;
export const selectCategoryById = (state, categoryId) =>
  state.categories.categories.find((cat) => cat.id === categoryId);
export const selectCategoriesByParent = (state, parentId = null) =>
  state.categories.categories.filter((cat) => cat.parentId === parentId);
export const selectSelectedCategory = (state) =>
  state.categories.selectedCategory;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;
