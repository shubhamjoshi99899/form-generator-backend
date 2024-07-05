// routes/formRoutes.js
const express = require("express");
const Form = require("../models/form");
const router = express.Router();

// POST: Create a new form
router.post("/", async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Retrieve all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).send(forms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET: Retrieve a form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).send();
    }
    res.status(200).send(form);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
