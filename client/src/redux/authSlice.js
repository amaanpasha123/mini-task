import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
 
// ── Thunk ──
export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData, thunkAPI) => {
        try {
            const res = await api.post("/auth/login", formData);
 
            // Save to localStorage so Navbar & Dashboard can read it
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
 
            return res.data; // { token, role }
 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);
 
// ── Slice ──
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        role:  localStorage.getItem("role")  || null,
        loading: false,
        error: null,
        message: ""
    },
    reducers: {
        logout: (state) => {
            state.token   = null;
            state.role    = null;
            state.error   = null;
            state.message = "";
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error   = null;
                state.message = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token   = action.payload.token;
                state.role    = action.payload.role;
                state.message = "Login successful";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload;
            });
    }
});
 
export const { logout } = authSlice.actions;
export default authSlice.reducer;