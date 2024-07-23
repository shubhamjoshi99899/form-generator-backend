const express = require("express");
const Collection = require("../models/collection");
const router = express.Router();

// Save a new collection with image URLs
router.post("/", async (req, res) => {
  const { collectionTitle, items } = req.body;

  try {
    const newCollection = new Collection({
      title: collectionTitle,
      items,
    });

    await newCollection.save();
    res.status(200).send(newCollection);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all collections
router.get("/collections", async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
