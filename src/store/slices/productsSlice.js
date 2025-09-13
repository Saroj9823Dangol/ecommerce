import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    sortBy: "featured",
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  },
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await productApi.getProducts(params);
      // return response.data;
      return []; // Mock response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await productApi.getProductById(productId);
      // return response.data;
      return null; // Mock response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await productApi.getFeaturedProducts();
      // return response.data;
      return []; // Mock response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },

    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products || [];
      state.pagination = {
        ...state.pagination,
        total: action.payload.total || 0,
        totalPages: action.payload.totalPages || 1,
      };
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Product By ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Featured Products
    builder.addCase(fetchFeaturedProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.featuredProducts = action.payload;
    });
    builder.addCase(fetchFeaturedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  setFilters,
  resetFilters,
  setPage,
  clearSelectedProduct,
  clearError,
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectFeaturedProducts = (state) =>
  state.products.featuredProducts;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectFilters = (state) => state.products.filters;
export const selectPagination = (state) => state.products.pagination;

export default productsSlice.reducer;
