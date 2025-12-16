// auth slice mai thunk handel krte hai or state ke cases handel krte hai satte thunk ke thuru pass hoti hai 

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSucsess: false,
    message: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      // Register
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucsess = true;
        state.user = action.payload;
        state.isError = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucsess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucsess = true;
        state.user = action.payload;
        state.isError = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucsess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;


// thunk ki function service call krne ke liye hoti hai service call krene se yeh sari functanolity work kregi slice ki
 
 export const userRegister=createAsyncThunk("AUTH/REGISTERE",async(formdata,thunkAPI)=>
{
    try {
        return await authService.register(formdata)

    } catch (error) {
        
      const message=error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})

 export const userLogin=createAsyncThunk("AUTH/LOGIN",async(formdata,thunkAPI)=>
{
    try {
        return await authService.login(formdata)
    } catch (error) {
        
      const message=error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})