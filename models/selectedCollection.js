const mongoose = require("mongoose");
const Item = require("./collection");

const selectedCollectionSchema = new mongoose.Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  images: [Item.schema],
});

module.exports = mongoose.model("SelectedCollection", selectedCollectionSchema);
