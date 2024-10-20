// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");
const currentFormRoutes = require("./routes/currentFormRoutes");
const userRoutes = require("./routes/userRoutes");
const collectionRoutes = require("./routes/collection");
const selectedCollectionRoutes = require("./routes/selectedCollection");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
require("dotenv").config();
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/forms", formRoutes);
app.use("/responses", responseRoutes);
app.use("/currentForm", currentFormRoutes);
app.use("/users", userRoutes);
app.use("/collections", collectionRoutes);
app.use("/selectedCollection", selectedCollectionRoutes);

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
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
