import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

// =======================
// ADD BOOKING
// =======================
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
        error.response?.data?.message || "Booking failed!",
      );
    }
  },
);

// =======================
// FETCH BOOKINGS here we fetch only the bookings of the logged-in user
// =======================
export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await bookingService.getUserBookings(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching your bookings",
      );
    }
  },
);

// =======================
// ✅ CANCEL BOOKING (FIXED)
// =======================
export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const result = await bookingService.cancelBooking(payload.selectedBookingId, token);
      payload.handleCloseModal && payload.handleCloseModal();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel booking",
      );
    }
  },
);

const initialState = {
  bookings: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isSucsess: false, // keep for compatibility
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
      state.isSucsess = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= ADD =================
      .addCase(AddBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSucsess = true;
        state.isError = false;

        state.bookings.push(action.payload.booking);
        state.message = action.payload.message;
      })
      .addCase(AddBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= FETCH =================
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= CANCEL =================
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        const cancelledBooking = action.payload.booking;

        state.bookings = state.bookings.map((b) =>
          b._id === cancelledBooking._id ? { ...b, status: "Cancelled" } : b,
        );

        state.message =
          action.payload.message || "Booking cancelled successfully";
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
