import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  searchTerm: "",
  filters: {
    category: "",
    minPrice: 0,
    maxPrice: 9999,
    sortBy: "name", // "name", "price", "price-desc"
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        pagination: {
          ...state.pagination,
          totalItems: action.payload.length,
        },
        loading: false,
        error: null,
      };
    },

    setCurrentProduct: (state, action) => {
      return {
        ...state,
        currentProduct: action.payload,
        loading: false,
        error: null,
      };
    },

    setSearchTerm: (state, action) => {
      return {
        ...state,
        searchTerm: action.payload,
        currentPage: 1, // Reset to first page when searching
      };
    },

    setFilters: (state, action) => {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1, // Reset to first page when filtering
      };
    },

    setCurrentPage: (state, action) => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      };
    },

    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },

    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },

    clearError: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },

    clearFilters: (state, action) => {
      return {
        ...state,
        searchTerm: "",
        filters: {
          category: "",
          minPrice: 0,
          maxPrice: 9999,
          sortBy: "name",
        },
        currentPage: 1,
      };
    },
  },
});

export const {
  setProducts,
  setCurrentProduct,
  setSearchTerm,
  setFilters,
  setCurrentPage,
  setLoading,
  setError,
  clearError,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;

export const selectProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) =>
  state.products.filteredProducts;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectFilters = (state) => state.products.filters;
export const selectPagination = (state) => state.products.pagination;

export const selectPaginatedProducts = (state) => {
  const { currentPage, itemsPerPage } = state.products.pagination;
  const { filteredProducts } = state.products;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredProducts.slice(startIndex, endIndex);
};

export const selectTotalPages = (state) => {
  const { totalItems, itemsPerPage } = state.products.pagination;
  return Math.ceil(totalItems / itemsPerPage);
};
