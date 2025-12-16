const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,);
        console.log(`MongoDB Connected: ${conn.connection.name}`.bgGreen.white);

    } catch (error) {
        console.log(`DB connection Faild ${error}`.bgRed.white)
        // console.log(error)
    }

} 
module.exports =connectDB;