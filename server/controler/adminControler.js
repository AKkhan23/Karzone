const carModels = require("../model/carModels");
const userModel = require("../model/userModel");
const bookingModel = require("../model/bookingModel");

//   ADD CAR
const addCar = async (req, res) => {
  const {
    name,
    phone,
    carOwnerName,
    shopeAdress,
    brand,
    imageUrl,
    price,
    description,
    fuelType,
    category,
    isAvailable,
  } = req.body;

  if (
    !name ||
    !brand ||
    !imageUrl ||
    !price ||
    !description ||
    !fuelType ||
    !category ||
    !phone ||
    !carOwnerName ||
    !shopeAdress
  ) {
    return res.status(400).json({ msg: "Please fill all details" });
  }

  const newCar = await carModels.create({
    name,
    phone,
    carOwnerName,
    shopeAdress,
    brand,
    imageUrl,
    price,
    description,
    fuelType,
    category,
    isAvailable, 
  });

  res.status(201).json(newCar);
};

//  UPDATE CAR
const updateCar = async (req, res) => {
  const updatedCar = await carModels.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedCar)
    return res
      .status(404)
      .json({ msg: "Vehicle not found or failed to update" });

  res.status(200).json(updatedCar);
};

//  DELETE CAR  -
const deletCar = async (req, res) => {
  await carModels.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, msg: "Delete successful" });
};

// - GET ALL CARS
const getAllCars = async (req, res) => {
  const cars = await carModels.find(); // sab cars ka data
  res.status(200).json(cars);
};

//   GET ALL USERS
const getAllusers = async (req, res) => {
  const users = await userModel.find();
  if (!users) return res.status(404).json({ msg: "Users not found" });
  res.status(200).json(users);
};

//  UPDATE BOOKING
const updateBooking = async (req, res) => {
  const updated = await bookingModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated)
    return res.status(404).json({ msg: "Failed to update booking" });
  res.status(200).json(updated);
};

// - GET ALL BOOKINGS
const getAllbookings = async (req, res) => {
  const bookings = await bookingModel.find().populate("user").populate("car")
  res.status(200).json(bookings);
};

module.exports = {
  addCar,
  updateCar,
  deletCar,
  getAllusers,
  updateBooking,
  getAllbookings,
  getAllCars,
};
