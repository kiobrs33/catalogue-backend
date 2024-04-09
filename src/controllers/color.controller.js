const { response, request } = require("express");

// MODELOS
const Color = require("../models/color.model");

const getColors = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const query = { deleted: false };

    const [colors, total] = await Promise.all([
      Color.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
      Color.countDocuments(query),
    ]);

    res.status(200).json({
      msg: "OK Lista de Colors",
      total,
      colors,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const postColor = async (req = request, res = response) => {
  try {
    const body = req.body;
    const color = new Color(body);

    await color.save();

    res.status(200).json({
      msg: "OK Color creado.",
      color,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const updateColor = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const color = await Color.findOneAndUpdate(
      { _id: id, deleted: false },
      body
    );

    if (!color) {
      return res.status(404).json({
        msg: "ERROR 'id' del Color no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Color actualizado.",
      color,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const deleteColor = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const color = await Color.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true }
    );

    if (!color) {
      return res.status(404).json({
        msg: "ERROR 'id' del Color no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Color eliminado.",
      color,
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
  getColors,
  postColor,
  updateColor,
  deleteColor,
};
