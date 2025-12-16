const express=require("express");
const protect = require("../middleware/authMiddleware");
const { addBooking, getMybookings, cancelBooking } = require("../controler/bookingControler");


const router=express.Router()

router.post("/",protect,addBooking)
router.get("/",protect,getMybookings)
router.put("/:bid",protect,cancelBooking)

 module.exports=router;