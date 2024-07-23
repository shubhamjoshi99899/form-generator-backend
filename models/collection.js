const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ title: String, url: String }],
});

module.exports = mongoose.model("Collection", collectionSchema);
