const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");

let selectedCollectionId = null;

router.post("/", (req, res) => {
  selectedCollectionId = req.body.id;
  res.send({ message: "Selected collection updated" });
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
