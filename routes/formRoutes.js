// routes/formRoutes.js
const express = require("express");
const router = express.Router();
const Form = require("../models/form");

// POST: Create a new form
router.post("/", async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating form", error: error.message });
  }
});

// GET: Retrieve all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving forms", error: error.message });
  }
});

// GET: Retrieve a form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving form", error: error.message });
  }
});

// PUT: Update a form by ID
router.put("/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form updated successfully", form });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating form", error: error.message });
  }
});

// DELETE: Delete a form by ID
router.delete("/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting form", error: error.message });
  }
});

module.exports = router;
