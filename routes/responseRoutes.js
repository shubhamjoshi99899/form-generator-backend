// routes/responseRoutes.js
const express = require("express");
const router = express.Router();
const Response = require("../models/response");
const Form = require("../models/form");

// POST: Create a new response
router.post("/", async (req, res) => {
  try {
    const { formId, responses } = req.body;

    console.log(responses);
    // Validate that the form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Map field IDs to labels and store responses accordingly
    const labelResponses = {};
    form.fields.forEach((field) => {
      if (responses[field._id]) {
        labelResponses[field.label] = responses[field._id];
      }
    });

    const response = new Response({ formId, responses: labelResponses });
    await response.save();
    res
      .status(201)
      .json({ message: "Response created successfully", response });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating response", error: error.message });
  }
});

// GET: Retrieve all responses for a form
router.get("/form/:formId", async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.status(200).json(responses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving responses", error: error.message });
  }
});

// GET: Retrieve a response by ID
router.get("/:id", async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving response", error: error.message });
  }
});

module.exports = router;
