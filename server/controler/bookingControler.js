 const bookingModel = require("../model/bookingModel");
const carModels = require("../model/carModels");

const addBooking = async (req, res) => {
  try {

    //  FIX — contactNumber add kiya
    const { carId, startDate, endDate, contactNumber } = req.body;

    // Validation
    if (!carId || !startDate || !endDate || !contactNumber) {
      return res.status(400).json({
        message: "carId, startDate, endDate and contactNumber are required"
      });
    }

    // Convert dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Find car
    const car = await carModels.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Calculate total days
    const oneDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.round((end - start) / oneDay);

    if (totalDays <= 0) {
      return res.status(400).json({
        message: "End date must be after start date"
      });
    }

    // Calculate price
    const totalPrice = totalDays * car.price;

    //  Create booking
    const newBooking = await bookingModel.create({
      user: req.user._id,
      car: car._id,
      startDate: start,
      endDate: end,
      totalDays,
      totalPrice,
      contactNumber
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
