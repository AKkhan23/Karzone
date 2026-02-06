import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

// Thunks
export const AddBooking = createAsyncThunk(
  "booking/AddBooking",
  async (formdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const payload = {
        carId: formdata.id,
        ...formdata.form,
      };
      // returns { message, booking }
      return await bookingService.addbooking(payload, token);
    } catch (error) {
      const message = error.response?.data?.message || "Booking failed!";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      // returns array of bookings
      return await bookingService.getUserBookings(token);
    } catch (error) {
      const message =
        error.response?.data?.message || "Error fetching your bookings";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (bookingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      // returns { success, message, booking }
      return await bookingService.CancellBooking(bookingId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to cancel booking";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  bookings: [], // array of booking objects
  isLoading: false,
  isError: false,
  isSuccess: false,
  // some parts of your app used this misspelled flag, keep it for compatibility:
  isSucsess: false,
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
      // ADD BOOKING
      .addCase(AddBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSucsess = true; // keep backward compatibility
        state.isError = false;

        // action.payload is { message, booking }
        if (action.payload && action.payload.booking) {
          state.bookings.push(action.payload.booking);
          state.message = action.payload.message || null;
        } else {
          // fallback: if somehow backend returned the booking directly
          state.bookings.push(action.payload);
        }
      })
      .addCase(AddBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isSucsess = false;
        state.isError = true;
        state.message = action.payload || "Failed to add booking";
      })

      // FETCH USER BOOKINGS
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        // action.payload is array of bookings
        state.bookings = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch bookings";
      })

      // CANCEL BOOKING
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        if (action.payload?.booking) {
          const index = state.bookings.findIndex(
            (b) => b._id === action.payload.booking._id,
          );
          if (index !== -1) {
            state.bookings[index] = action.payload.booking;
          }
        }

        state.message =
          action.payload?.message || "Booking cancelled successfully";
      })

      .addCase(cancelBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isSucsess = false;
        state.isError = true;
        state.message = action.payload || "Failed to cancel booking";
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
