const { response, request } = require("express");

// MODELOS
const Role = require("../models/role.model");

const getRoles = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const query = { deleted: false };

    const [roles, total] = await Promise.all([
      Role.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
      Role.countDocuments(query),
    ]);

    res.status(200).json({
      msg: "OK Lista de roles",
      total,
      roles,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const postRole = async (req = request, res = response) => {
  try {
    const body = req.body;
    const role = new Role(body);

    await role.save();

    res.status(200).json({
      msg: "OK Role creado.",
      role,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const updateRole = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const role = await Role.findOneAndUpdate(
      { _id: id, deleted: false },
      body,
      {
        returnOriginal: false,
      }
    );

    if (!role) {
      return res.status(404).json({
        msg: "ERROR 'id' del Role no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Role actualizado.",
      role,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const deleteRole = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const role = await Role.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true }
    );

    if (!role) {
      return res.status(404).json({
        msg: "ERROR 'id' del Role no encontrado.",
      });
    }

    res.status(200).json({
      msg: "OK Role eliminado.",
      role,
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
  getRoles,
  postRole,
  updateRole,
  deleteRole,
};
