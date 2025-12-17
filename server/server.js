 const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const colors = require("colors");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ Request:", req.method, req.originalUrl);
  console.log("🌍 Origin:", req.headers.origin);
  next();
});


app.use(
  cors({
    origin: "https://karzone-z9pw.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to car rental Api" });
});

// AUTH ROUTES
app.use("/api/auth", require("./routes/authRouts"));

// CAR ROUTES
app.use("/api/car", require("./routes/carRouts"));

// ADMIN ROUTES
app.use("/api/admin", require("./routes/adminRout"));

// BOOKING ROUTES
app.use("/api/booking", require("./routes/bookingRout"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.america);
});
