const { response, request } = require("express");

const Register = require("../models/register.model");
const User = require("../models/user.model");
const RegisterDetail = require("../models/register-detail.model");

const getRegisters = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { limit = 10, skip = 0 } = req.query;
    const query = { user_id: id, deleted: false };

    let [registers, total] = await Promise.all([
      Register.find(query).skip(parseInt(skip)).limit(parseInt(limit)),
      Register.countDocuments(query),
    ]);

    res.status(200).json({
      msg: "OK Lista de Registros",
      total,
      registers,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const getOneRegister = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    // Obteniendo todas las Photo
    let register = await Register.findOne({ _id: id });

    if (!register) {
      return res.status(400).json({
        msg: "ERROR Register no encontrado.",
      });
    }

    let details = [];

    // Accediendo al Modelo PhotoHasLabel
    details = await RegisterDetail.find({
      register_id: id,
    }).populate("product_id");

    register = { ...register._doc, details };

    res.status(200).json({
      msg: "OK Register.",
      register,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

const postRegister = async (req = request, res = response) => {
  try {
    const { details = [], ...rest } = req.body;

    const user = User.findOne({ _id: rest.user_id });

    if (!user) {
      res.status(400).json({
        msg: "ERROR El User no existe.",
      });
    }

    const registerObj = new Register(rest);

    const registerResult = await registerObj.save();

    if (!registerResult) {
      res.status(400).json({
        msg: "ERROR Al registrar.",
      });
    }

    await Promise.all(
      details.map(async (detail) => {
        const registerDetailObj = new RegisterDetail({
          register_id: registerResult._id,
          product_id: detail.user_id,
          quantity: detail.quantity,
          sale_price: detail.sale_price,
          total_sale_price: detail.total_sale_price,
        });

        return await registerDetailObj.save();
      })
    );

    res.status(200).json({
      msg: "OK Register Saved.",
      register: registerResult,
    });
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).json({
      msg: "ERROR",
      error: error.message,
    });
  }
};

module.exports = {
  getRegisters,
  getOneRegister,
  postRegister,
};
