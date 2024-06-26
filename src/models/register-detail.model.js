const { Schema, model } = require("mongoose");

const RegisterModel = require("./register.model");
const ProductModel = require("./product.model");

const RegisterDetailSchema = Schema(
  {
    register_id: {
      type: Schema.Types.ObjectId,
      ref: RegisterModel,
      required: [true, "The register_id is required"],
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: ProductModel,
      required: [true, "The product_id is required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("RegisterDetail", RegisterDetailSchema);
