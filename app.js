// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/forms", formRoutes);
app.use("/responses", responseRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://shubhamjoshi99899:GPhR89JpJ9nVu8gc@cluster0.35hdsz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {},
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
