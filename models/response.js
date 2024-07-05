// models/response.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  templateId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  formId: { type: String, required: true },
  responses: [
    {
      fieldId: { type: String, required: true },
      label: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Response", responseSchema);
