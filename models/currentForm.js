const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentFormSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
});

module.exports = mongoose.model("CurrentForm", currentFormSchema);
