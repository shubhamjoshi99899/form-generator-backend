// routes/responseRoutes.js
const express = require("express");
const router = express.Router();
const Response = require("../models/response");

// POST: Create a new response
router.post("/", async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Retrieve all responses for a given templateId
router.get("/template/:templateId", async (req, res) => {
  try {
    const responses = await Response.find({
      templateId: req.params.templateId,
    });
    res.status(200).send(responses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET: Retrieve a response by formId
router.get("/form/:formId", async (req, res) => {
  try {
    const response = await Response.findOne({ formId: req.params.formId });
    if (!response) {
      return res.status(404).send();
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
