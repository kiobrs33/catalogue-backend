const { Schema, model } = require("mongoose");

const RoleSchema = Schema(
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

module.exports = model("Role", RoleSchema);
