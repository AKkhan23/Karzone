import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bookingService from "./bookingService";

// ADD BOOKING
export const AddBooking = createAsyncThunk(
  "booking/AddBooking",
  async (formdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const payload = {
        carId: formdata.id,
        ...formdata.form,
      };
      return await bookingService.addbooking(payload, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Booking failed!"
      );
    }
  }
);

// FETCH BOOKINGS
export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await bookingService.getUserBookings(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching bookings"
      );
    }
  }
);

// CANCEL BOOKING ✅
export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (bookingId, thunkAPI) => {
    try {
      await axios.put(
        `/api/bookings/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
          },
        }
      );

      return {
        bookingId,
        message: "Booking cancelled successfully",
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Cancel failed"
      );
    }
  }
);

const initialState = {
  bookings: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(AddBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings.push(action.payload.booking);
        state.message = action.payload.message;
      })
      .addCase(AddBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FETCH
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // CANCEL ✅
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.bookings = state.bookings.map((b) =>
          b._id === action.payload.bookingId
            ? { ...b, status: "Cancelled" }
            : b
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
