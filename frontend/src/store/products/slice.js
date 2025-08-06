import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsService } from "../../api/products";

const initialState = {
  products: [],
  // filteredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  // searchTerm: "",
  // filters: {
  //   category: "",
  //   minPrice: 0,
  //   maxPrice: 9999,
  //   sortBy: "name", // "name", "price", "price-desc"
  // },
  // pagination: {
  //   currentPage: 1,
  //   itemsPerPage: 8,
  //   totalItems: 0,
  // },
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
    totalPages: 0,
  },
  filters: {
    search: "",
    category_id: "",
    color: "",
    size: "",
    min_price: "",
    max_price: "",
    sort_by: "name",
    sort_order: "asc",
  },
};

// export const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProducts: (state, action) => {
//       return {
//         ...state,
//         products: action.payload,
//         filteredProducts: action.payload,
//         pagination: {
//           ...state.pagination,
//           totalItems: action.payload.length,
//         },
//         loading: false,
//         error: null,
//       };
//     },

//     setCurrentProduct: (state, action) => {
//       return {
//         ...state,
//         currentProduct: action.payload,
//         loading: false,
//         error: null,
//       };
//     },

//     setSearchTerm: (state, action) => {
//       return {
//         ...state,
//         searchTerm: action.payload,
//         currentPage: 1, // Reset to first page when searching
//       };
//     },

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await productsService.getAllProducts(params);
      return response;
      // const data = response.data || response;
      // return data;
    } catch (error) {
      return rejectWithValue(error.message || "failed to fetch products");
    }
  }
);

// setFilters: (state, action) => {
//   return {
//     ...state,
//     filters: { ...state.filters, ...action.payload },
//     currentPage: 1, // Reset to first page when filtering
//   };
// },

// setCurrentPage: (state, action) => {
//   return {
//     ...state,
//     pagination: {
//       ...state.pagination,
//       currentPage: action.payload,
//     },
//   };
// },

// setLoading: (state, action) => {
//   return {
//     ...state,
//     loading: action.payload,
//   };
// },
export const fetchProductByIdThunk = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productsService.getProductById(id);
      const data = response.data || response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch product");
    }
  }
);
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    // setError: (state, action) => {
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    clearError: (state) => {
      state.error = null;
    },

    // clearError: (state, action) => {
    //   return {
    //     ...state,
    //     error: null,
    //   };
    // },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        category_id: "",
        color: "",
        size: "",
        min_price: "",
        max_price: "",
        sort_by: "name",
        sort_order: "asc",
      };
      state.pagination.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      // state.products = action.payload;
      const response = action.payload;
      console.log("Redux: Products fetched successfully:", {
        productsCount: response.data?.length || 0,
        pagination: {
          currentPage: response.current_page,
          totalPages: response.last_page,
          totalItems: response.total,
        },
      });
      state.products = response.data || [];

      // state.products = response.data?.data || [];

      // state.products = Array.isArray(response.data) ? response.data : [];
      state.pagination = {
        currentPage: response.current_page || 1,
        itemsPerPage: response.per_page || 8,
        totalItems: response.total || 0,
        totalPages: response.last_page || 0,
      };
      // const data = action.payload.data || action.payload;
      // state.products = data;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // clearFilters: (state, action) => {
    //   return {
    //     ...state,
    //     searchTerm: "",
    //     filters: {
    //       category: "",
    //       minPrice: 0,
    //       maxPrice: 9999,
    //       sortBy: "name",
    //     },
    //     currentPage: 1,
    //   };
    // },

    builder.addCase(fetchProductByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchProductByIdThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// export const {
//   setProducts,
//   setCurrentProduct,
//   setSearchTerm,
//   setFilters,
//   setCurrentPage,
//   setLoading,
//   setError,
//   clearError,
//   clearFilters,
// } = productsSlice.actions;
// export const { clearCurrentProduct, clearError } = productsSlice.actions;
export const {
  clearCurrentProduct,
  clearError,
  setFilters,
  setCurrentPage,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;

export const selectProducts = (state) => state.products.products;
// export const selectFilteredProducts = (state) =>
//   state.products.filteredProducts;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
// export const selectSearchTerm = (state) => state.products.searchTerm;
// export const selectFilters = (state) => state.products.filters;
// export const selectPagination = (state) => state.products.pagination;

// export const selectPaginatedProducts = (state) => {
//   const { currentPage, itemsPerPage } = state.products.pagination;
//   const { filteredProducts } = state.products;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   return filteredProducts.slice(startIndex, endIndex);
// };

// export const selectTotalPages = (state) => {
//   const { totalItems, itemsPerPage } = state.products.pagination;
//   return Math.ceil(totalItems / itemsPerPage);
// };
export const selectPagination = (state) => state.products.pagination;
export const selectFilters = (state) => state.products.filters;
