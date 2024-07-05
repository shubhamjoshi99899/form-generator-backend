// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");
const app = express();
require("dotenv").config();
// Middleware
app.use(bodyParser.json());

// Routes
app.use("/forms", formRoutes);
app.use("/responses", responseRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
