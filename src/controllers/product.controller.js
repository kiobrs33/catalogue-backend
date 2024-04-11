const { response, request } = require("express");

// MODELOS
const Product = require("../models/product.model");

const getProducts = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const query = { deleted: false };

    let [products, total] = await Promise.all([
      Product.find(query)
        .populate("model_id")
        .populate("color_id")
        .populate("size_id")
        .skip(parseInt(skip))
        .limit(parseInt(limit)),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      msg: "OK Lista de Products",
      total,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const postProduct = async (req = request, res = response) => {
  try {
    const body = req.body;
    const product = new Product(body);

    await product.save();

    res.status(200).json({
      msg: "OK Product creado.",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const updateProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, deleted: false },
      body,
      {
        returnOriginal: false,
      }
    );

    if (!product) {
      return res.status(404).json({
        msg: "ERROR 'id' del Product no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Product actualizado.",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true }
    );

    if (!product) {
      return res.status(404).json({
        msg: "ERROR 'id' del Product no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Product eliminado.",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
};
