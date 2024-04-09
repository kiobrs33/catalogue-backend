const { Schema, model } = require("mongoose");

const RoleModel = require("./role.model");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    lastname: {
      type: String,
      required: [true, "The lastname is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    role_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: RoleModel,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
