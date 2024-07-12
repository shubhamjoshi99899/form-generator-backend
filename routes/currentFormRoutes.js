const express = require("express");
const router = express.Router();
const CurrentForm = require("../models/currentForm");
const User = require("../models/user");

// POST: Set the current form for a user
router.post("/set", async (req, res) => {
  const { userId, formId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update or create the current form entry for the user
    const currentForm = await CurrentForm.findOneAndUpdate(
      { userId },
      { formId },
      { new: true, upsert: true },
    );
    res
      .status(200)
      .json({ message: "Current form set successfully", currentForm });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error setting current form", error: error.message });
  }
});

// GET: Retrieve the current form for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const currentForm = await CurrentForm.findOne({ userId }).populate(
      "formId",
    );
    if (!currentForm) {
      return res.status(404).json({ message: "Current form not found" });
    }
    res.status(200).json(currentForm);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving current form", error: error.message });
  }
});

module.exports = router;
