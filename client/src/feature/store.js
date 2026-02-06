// this is a frontend work for centralaizing the data Mtlb deta ko ek hi jagah par store karke sab dur provide krna distrubutr krskte hai thrue prociding to the main
// yeh sab redux tool kit ka data se chalta hai yah ham sikhenge redux toolkit kis use mai ata hai
import { configureStore } from '@reduxjs/toolkit'
import auth from "../feature/auth/authSlice"
import admin from "../feature/adim/adminSlice"
import booking from "../feature/Booking/bookingSlice"
const store = configureStore({
    reducer: {
        auth
        ,admin,booking
    },
})

export default store