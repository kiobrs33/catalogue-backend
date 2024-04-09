const { Schema, model } = require("mongoose");

const ColorSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Color", ColorSchema);
