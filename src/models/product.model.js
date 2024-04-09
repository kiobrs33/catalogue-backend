const { Schema, model } = require("mongoose");

const BrandModel = require("./brand.model");
const ModelModel = require("./model.model");
const ColorModel = require("./color.model");
const SizeModel = require("./size.model");

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name product is required"],
    },
    sale_price: {
      type: Number,
      required: [true, "The sale price product is required"],
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: BrandModel,
      required: [true, "The brand_id is required"],
    },
    model_id: {
      type: Schema.Types.ObjectId,
      ref: ModelModel,
      required: [true, "The model_id is required"],
    },
    color_id: {
      type: Schema.Types.ObjectId,
      ref: ColorModel,
      required: [true, "The color_id is required"],
    },
    size_id: {
      type: Schema.Types.ObjectId,
      ref: SizeModel,
      required: [true, "The size_id is required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
