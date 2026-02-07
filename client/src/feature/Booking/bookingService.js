import axios from "axios";

const API_BASE = "https://karzone-z9pw.onrender.com/api/booking";

// =====================
// CREATE BOOKING
// =====================
const addbooking = async (formData, token) => {
  const res = await axios.post(API_BASE, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // backend response:
  // { message: 'Booking created successfully', booking: {...} }
  return res.data;
};

// =====================
// GET USER BOOKINGS
// =====================
const getUserBookings = async (token) => {
  const res = await axios.get(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // backend response:
  // [ { booking1 }, { booking2 } ]
  return res.data;
};

// =====================
// ✅ CANCEL BOOKING (FIXED & CORRECT)
// =====================
const cancelBooking = async (bookingId, token) => {
  const res = await axios.put(
    `${API_BASE}/${bookingId}`,
    {}, // body empty
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  // backend response:
  // { success: true, message: 'Booking cancelled successfully', booking: {...} }
  return res.data;
};

// =====================
// EXPORT
// =====================
const bookingService = {
  addbooking,
  getUserBookings,
  cancelBooking,
};

export default bookingService;
