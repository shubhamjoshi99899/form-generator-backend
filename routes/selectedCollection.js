const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");
const SelectedCollection = require("../models/selectedCollection"); // Import the new model

let selectedCollectionId = null;

router.post("/", async (req, res) => {
  selectedCollectionId = req.body.id;

  try {
    // Find the existing document
    let selectedCollection = await SelectedCollection.findOne();
    const selected = await Collection.findById(selectedCollectionId);
    console.log(selected);
    if (selectedCollection) {
      // Update the existing document
      selectedCollection.collectionId = selectedCollectionId;
      await selectedCollection.save();
      res.send({ message: "Selected collection updated in database" });
    } else {
      // Create a new document if none exists
      const newSelectedCollection = new SelectedCollection({
        collectionId: selectedCollectionId,
        images: selected.images,
      });
      await newSelectedCollection.save();
      res.send({
        message: "Selected collection created and saved to database",
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Error saving selected collection" });
  }
});

router.get("/", async (req, res) => {
  if (selectedCollectionId) {
    const selectedCollection = await Collection.findById(selectedCollectionId);
    if (!selectedCollection) {
      return res.status(404).send();
    }
    res.send(selectedCollection);
  } else {
    res.send(null);
  }
});

module.exports = router;
