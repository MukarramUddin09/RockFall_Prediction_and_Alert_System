const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Mount your auth routes here
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// 🔹 Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
