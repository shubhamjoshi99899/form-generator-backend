const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://shubhamjoshi99899:GPhR89JpJ9nVu8gc@cluster0.35hdsz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const formRoutes = require("./routes/formRoutes");
const formTemplateRoutes = require("./routes/formTemplates");
const formResponseRoutes = require("./routes/formResponses");
app.use("/api/forms", formRoutes);
app.use("/api/form-templates", formTemplateRoutes);
app.use("/api/form-responses", formResponseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
