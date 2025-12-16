 // src/feature/admin/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllUsers,getAllCars,addNewCar,  editCar,getCarDeatails,} from "./adminServices";
import {deletCar, fetchAllBookings as fetchBookingsService,updateBookingStatusService,} from "../adim/adminServices";

// ---------- THUNKS ----------

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) return thunkAPI.rejectWithValue("No token found!");
      return await getAllUsers(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch all cars
export const fetchAllCars = createAsyncThunk(
  "admin/fetchAllCars",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) return thunkAPI.rejectWithValue("No token found!");
      return await getAllCars(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch single car details
export const fetchDeatail = createAsyncThunk(
  "admin/fetchDeatail",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) return thunkAPI.rejectWithValue("No token found!");
      return await getCarDeatails(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Add new car
export const addCar = createAsyncThunk(
  "admin/addCar",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) return thunkAPI.rejectWithValue("No token found!");
      return await addNewCar(formData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Remove car
export const removeCar = createAsyncThunk(
  "admin/removeCar",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await deletCar(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete car");
    }
  }
);

// Update car
export const updateCar = createAsyncThunk(
  "admin/updateCar",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await editCar(formData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update car");
    }
  }
);

// Fetch all bookings
export const fetchAllBookings = createAsyncThunk(
  "admin/fetchAllBookings",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) return thunkAPI.rejectWithValue("No token found!");
      const data = await fetchBookingsService(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch bookings");
    }
  }
);

// Update booking status
export const editBookingStatusThunk = createAsyncThunk(
  "admin/editBookingStatus",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      if (!token) return thunkAPI.rejectWithValue("No token found");
      return await updateBookingStatusService(formData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update booking status");
    }
  }
);

// ---------- SLICE ----------
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    cars: [],
    bookings: [],
    car: {},
    edit: { editCar: {}, isEdit: false },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
  },

  reducers: {
    resetAdminState: (state) => {
      state.users = [];
      state.cars = [];
      state.bookings = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
    setEditCar: (state, action) => {
      state.edit.editCar = action.payload;
      state.edit.isEdit = true;
    },
    clearEditCar: (state) => {
      state.edit.editCar = {};
      state.edit.isEdit = false;
    },
  },

  extraReducers: (builder) => {
    // --- USERS ---
    builder
      .addCase(fetchAllUsers.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      })

      // --- CARS ---
      .addCase(fetchAllCars.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.cars = action.payload;
      })
      .addCase(fetchAllCars.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      })

      // --- ADD CAR ---
      .addCase(addCar.pending, (state) => { state.isLoading = true; })
      .addCase(addCar.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.cars = action.payload;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      })

      // --- REMOVE CAR ---
      .addCase(removeCar.pending, (state) => { state.isLoading = true; })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true;
        state.cars = state.cars.filter((item) => item._id !== action.payload.id);
      })
      .addCase(removeCar.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      })

      // --- UPDATE CAR ---
      .addCase(updateCar.pending, (state) => { state.isLoading = true; })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true;
        state.cars = state.cars.map((item) => item._id === action.payload._id ? action.payload : item);
        state.edit = { editCar: {}, isEdit: false };
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      })

      // --- BOOKINGS ---
      .addCase(fetchAllBookings.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      })

      // --- SINGLE CAR DETAILS ---
      .addCase(fetchDeatail.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.car = action.payload;
      })
      .addCase(fetchDeatail.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      })

      // --- BOOKING STATUS UPDATE ---
      .addCase(editBookingStatusThunk.pending, (state) => { state.isLoading = true; })
      .addCase(editBookingStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true;
        state.bookings = state.bookings.map((b) => b._id === action.payload._id ? action.payload : b);
      })
      .addCase(editBookingStatusThunk.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload;
      });
  },
});

export const { resetAdminState, setEditCar, clearEditCar } = adminSlice.actions;
export default adminSlice.reducer;
