const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
  label: String,
  type: {
    type: String,
    enum: ["text", "number", "select", "radio"],
    required: true,
  },
  options: [String],
});

const FormTemplateSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  fields: [FieldSchema],
});

module.exports = mongoose.model("FormTemplate", FormTemplateSchema);
