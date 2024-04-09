const { Schema, model } = require("mongoose");

const SizeSchema = Schema(
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

module.exports = model("Size", SizeSchema);
