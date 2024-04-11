const { response, request } = require("express");

// MODELOS
const Model = require("../models/model.model");

const getModels = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const query = { deleted: false };

    const [models, total] = await Promise.all([
      Model.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
      Model.countDocuments(query),
    ]);

    res.status(200).json({
      msg: "OK Lista de Models",
      total,
      models,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const postModel = async (req = request, res = response) => {
  try {
    const body = req.body;
    const model = new Model(body);

    await model.save();

    res.status(200).json({
      msg: "OK Model creado.",
      model,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const updateModel = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const model = await Model.findOneAndUpdate(
      { _id: id, deleted: false },
      body,
      {
        returnOriginal: false,
      }
    );

    if (!model) {
      return res.status(404).json({
        msg: "ERROR 'id' del Model no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Model actualizado.",
      model,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const deleteModel = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const model = await Model.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true }
    );

    if (!model) {
      return res.status(404).json({
        msg: "ERROR 'id' del Model no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Model eliminado.",
      model,
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
  getModels,
  postModel,
  updateModel,
  deleteModel,
};
