// models/response.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Dynamic response schema
const responseSchema = new Schema(
  {
    formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    responses: { type: Map, of: String, required: true }, // Store responses in a map with dynamic keys
  },
  { timestamps: true },
);

module.exports = mongoose.model("Response", responseSchema);
