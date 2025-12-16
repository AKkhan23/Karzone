 const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

//Yaha aayega tumhara controller import
const {
  addCar,
  updateCar,
  deletCar,
  getAllusers,
  updateBooking,
  getAllbookings,
  getAllCars,
} = require("../controler/adminControler");


//  Admin Routes  

router.get("/get-users", authMiddleware, getAllusers);

router.get("/get-cars", authMiddleware, getAllCars);

router.post("/add-car", authMiddleware, addCar);

router.put("/update-car/:id", authMiddleware, updateCar);

router.delete("/delete-car/:id", authMiddleware, deletCar);

router.get("/get-bookings", authMiddleware, getAllbookings);

router.put("/update-booking/:id", authMiddleware, updateBooking);


module.exports = router;
