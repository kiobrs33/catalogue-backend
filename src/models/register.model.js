const { Schema, model } = require("mongoose");

const RegisterSchema = Schema(
  {
    date: {
      type: String,
      required: [true, "The name is required"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: UserSchema,
      required: [true, "The user_id is required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Register", RegisterSchema);
