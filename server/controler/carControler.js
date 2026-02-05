// yeh cars ka controler hai isme ham sari car ki api ka or uski detail ka loigc likhte hai actul api ka logic  car agr api mai detail hai agr car available hai to work krega nahi to nahi kreg ayeh logic isme hai

const carModels = require("../model/carModels");

const getCAllars = async (req, res) => {
  const cars = await carModels.find();

  if (!cars) {
    res.status(404);
    throw new Error("cars not found");
  } else res.status(200).json(cars);

  console.log(cars)
};



// req.params appan id ksi bhi chiz ki id ke thru usko find krne kai liye req.params.id use kiya jata hai
const getCar = async (req, res) => {
  const car = await carModels.findById(req.params.id, req.body);
  if (!car) {
    res.status(404);
    throw new Error("car not found");
  } else res.status(200).json(car);
};

module.exports = { getCAllars, getCar };
