const { response, request } = require("express");

// MODELOS
const Size = require("../models/size.model");

const getSizes = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const query = { deleted: false };

    const [sizes, total] = await Promise.all([
      Size.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
      Size.countDocuments(query),
    ]);

    res.status(200).json({
      msg: "OK Lista de Sizes",
      total,
      sizes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const postSize = async (req = request, res = response) => {
  try {
    const body = req.body;
    const size = new Size(body);

    await size.save();

    res.status(200).json({
      msg: "OK Size creado.",
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const updateSize = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const size = await Size.findOneAndUpdate(
      { _id: id, deleted: false },
      body,
      {
        returnOriginal: false,
      }
    );

    if (!size) {
      return res.status(404).json({
        msg: "ERROR 'id' del Size no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Size actualizado.",
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const deleteSize = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const size = await Size.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true }
    );

    if (!size) {
      return res.status(404).json({
        msg: "ERROR 'id' del Size no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Size eliminado.",
      size,
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
  getSizes,
  postSize,
  updateSize,
  deleteSize,
};
