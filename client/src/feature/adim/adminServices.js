// src/feature/adim/adminServices.js
import axios from "axios";

// USERS
export const getAllUsers = async (token) => {
  const res = await axios.get("/api/admin/get-users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// CARS
export const getAllCars = async (token) => {
  const res = await axios.get("/api/car/get-cars", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getCarDeatails = async (id, token) => {
  const res = await axios.get(`/api/car/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ADD CAR
export const addNewCar = async (formData, token) => {
  const res = await axios.post("/api/admin/add-car", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// DELETE CAR
export const deletCar = async (id, token) => {
  const res = await axios.delete(`/api/admin/delete-car/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// UPDATE CAR
export const editCar = async (formData, token) => {
  const res = await axios.put(
    `/api/admin/update-car/${formData.id}`,
    formData.data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// BOOKINGS
export const fetchAllBookings = async (token) => {
  const res = await axios.get("/api/admin/get-bookings", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// UPDATE BOOKING STATUS 
export const updateBookingStatusService = async (formData, token) => {
  const res = await axios.put(
    `/api/admin/update-booking/${formData.id}`,
    formData.data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
