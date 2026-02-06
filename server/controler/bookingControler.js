 



// yeh controler ke under jitni bhi api banti hai woh normal user kaia liye banati hia 
// yeh getmybookings se user apni booking dekhskta hia bas 


const bookingModel = require("../model/bookingModel");
const carModels = require("../model/carModels");

const addBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    // Required fields check
    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ message: "carId, startDate and endDate are required" });
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
      return res.status(400).json({ message: "End date must be after start date" });
    }

    // Calculate price
    const totalPrice = totalDays * car.price;

    // Create booking document
    const newBooking = await bookingModel.create({
      user: req.user._id,
      car: car._id,          // <-- FIXED LINE
      startDate: start,
      endDate: end,
      totalDays,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};




const getMybookings = async (req, res) => {
  const bookings = await bookingModel.find().populate("car").populate("user");
  if (!bookings) {
    res.status(400);
    throw new Error("Bookings Not found");
  } else res.status(200).json(bookings);  
  console.log(res.status)
};  

const cancelBooking=async(req,res)=>{
  const booking = await bookingModel.findById(req.params.bid)
  if(!booking){
    res.status(404).json({msg:"Booking not found"})
  }
// agr admin ki trf se bookijng approved hogyi hai to woh user use canceled nahi kar skta hai yeh uski api hai functanolity logic
  if(bookingModel.status==="Approved"){
    res.status(400).json({msg:"Booking can not cancelled at this stage"})
  }
  else{
    const cancelledBooking=await bookingModel.findByIdAndUpdate(req.params.bid,{status:"Cancelled"},{new:true});
     res.status(200).json(cancelledBooking)
  }
}





module.exports = { addBooking,getMybookings,cancelBooking };
