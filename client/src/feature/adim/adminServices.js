// src/feature/adim/adminServices.js
import axios from "axios";
import { baseURL } from "../../constant";

// USERS
export const getAllUsers = async (token) => {
  const res = await axios.get(`${baseURL}/admin/get-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// CARS
export const getAllCars = async (token) => {
  const res = await axios.get(`${baseURL}/car/get-cars`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getCarDeatails = async (id, token) => {
  const res = await axios.get(`${baseURL}/car/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ADD CAR
export const addNewCar = async (formData, token) => {
  const res = await axios.post(`${baseURL}/admin/add-car`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// DELETE CAR
export const deletCar = async (id, token) => {
  const res = await axios.delete(`${baseURL}/admin/delete-car/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// UPDATE CAR
export const editCar = async (formData, token) => {
  const res = await axios.put(
    `${baseURL}/admin/update-car/${formData.id}`,
    formData.data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// BOOKINGS
export const fetchAllBookings = async (token) => {
  const res = await axios.get(`${baseURL}/admin/get-bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// UPDATE BOOKING STATUS 
export const updateBookingStatusService = async (formData, token) => {
  const res = await axios.put(
    `${baseURL}/admin/update-booking/${formData.id}`,
    formData.data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
