// models/form.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
  label: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], default: [] },
  required: { type: Boolean, default: false },
  _id: { type: Schema.Types.ObjectId, auto: true },
});

const formSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fields: { type: [fieldSchema], required: true },
});

module.exports = mongoose.model("Form", formSchema);
