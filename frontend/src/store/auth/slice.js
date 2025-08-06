import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../api/auth";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  userRole: null,
};

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // const data = await authService.login(email, password);
      const response = await authService.login(email, password);
      const data = response.data || response;
      localStorage.setItem("token", data.authorisation.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return {
        user: data.user,
        token: data.authorisation.token,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // const data = await authService.register(userData);
      const response = await authService.register(userData);
      const data = response.data || response;
      localStorage.setItem("token", data.authorisation.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return {
        user: data.user,
        token: data.authorisation.token,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        userRole: action.payload.user.role,
        loading: false,
        error: null,
      };
    },
    logoutUser: (state, action) => {
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        userRole: null,
        loading: false,
        error: null,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    clearError: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userRole = action.payload.user.role || "customer";
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userRole = action.payload.user.role || "customer";
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

export const { loginUser, logoutUser, setLoading, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectUserRole = (state) => state.auth.userRole;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.userRole === "admin";
export const selectIsCustomer = (state) => state.auth.userRole === "customer";
