 const express = require('express');
const router = express.Router();

const { getCar } = require('../controler/carControler');
const { getAllCars } = require('../controler/adminControler');

// get all cars
router.get("/get-cars", getAllCars);

// get single car
router.get("/:id", getCar);

module.exports = router;
