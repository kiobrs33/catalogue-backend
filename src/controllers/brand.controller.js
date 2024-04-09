const { response, request } = require("express");

// MODELOS
const Brand = require("../models/brand.model");

const getBrands = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const query = { deleted: false };

    const [brands, total] = await Promise.all([
      Brand.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
      Brand.countDocuments(query),
    ]);

    res.status(200).json({
      msg: "OK Lista de Brands",
      total,
      brands,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const postBrand = async (req = request, res = response) => {
  try {
    const body = req.body;
    const brand = new Brand(body);

    await brand.save();

    res.status(200).json({
      msg: "OK Brand creado.",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const updateBrand = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const brand = await Brand.findOneAndUpdate(
      { _id: id, deleted: false },
      body
    );

    if (!brand) {
      return res.status(404).json({
        msg: "ERROR 'id' del Brand no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Brand actualizado.",
      brand,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const deleteBrand = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true }
    );

    if (!brand) {
      return res.status(404).json({
        msg: "ERROR 'id' del Brand no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Brand eliminado.",
      brand,
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
  getBrands,
  postBrand,
  updateBrand,
  deleteBrand,
};
