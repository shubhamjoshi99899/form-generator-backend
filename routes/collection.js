const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");

router.post("/", async (req, res) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).send(collection);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find();
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!collection) {
      return res.status(404).send();
    }
    res.send(collection);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) {
      return res.status(404).send();
    }
    res.send({ message: "Collection deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/:id/images", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).send();
    }
    collection.images.push(req.body);
    await collection.save();
    res.send(collection);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
