 import axios from "axios";

const API_BASE = "https://karzone-z9pw.onrender.com/api/booking";

// Create booking
const addbooking = async (formData, token) => {
  const res = await axios.post(API_BASE, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // backend returns: { message: 'Booking created successfully', booking: { ... } }
  return res.data; // keep full response so slice can read message + booking
};

// Fetch bookings of logged-in user
const getUserBookings = async (token) => {
  const res = await axios.get(API_BASE , {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(res.data);
  
  // backend returns something like: { bookings: [ ... ] }
  // return bookings array directly so thunks receive array
  return res.data;
};

const bookingService = { addbooking, getUserBookings };
export default bookingService;
