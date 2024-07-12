const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
  label: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], default: [] },
  required: { type: Boolean, default: false },
  fieldId: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
});

const formSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fields: { type: [fieldSchema], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Form", formSchema);
