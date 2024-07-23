const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");
const SelectedCollection = require("../models/selectedCollection");
let selectedCollectionId = null;

router.post("/", async (req, res) => {
  selectedCollectionId = req.body.id;

  try {
    const newSelectedCollection = new SelectedCollection({
      collectionId: selectedCollectionId,
    });
    await newSelectedCollection.save();
    res.send({ message: "Selected collection updated and saved to database" });
  } catch (error) {
    res.status(500).send({ error: "Error saving selected collection" });
  }
});

router.get("/", async (req, res) => {
  console.log(selectedCollectionId);
  if (selectedCollectionId) {
    const selectedCollection = await Collection.findById(selectedCollectionId);
    console.log(selectedCollection);
    if (!selectedCollection) {
      return res.status(404).send();
    }
    res.send(selectedCollection);
  } else {
    res.send(null);
  }
});

module.exports = router;
