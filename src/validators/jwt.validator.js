const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJWT = async (req = request, res = response, next) => {
  try {
    const xToken = req.header("x-token");

    if (!xToken) {
      return res.status(401).json({
        msg: "Se requiere 'x-token' - headers para esta solicitud.",
      });
    }

    const { id } = jwt.verify(xToken, process.env.SECRETOR_PRIVATE_KEY);

    const userLogged = await User.findById(id).populate("role_id", "name");

    req.userLogged = userLogged;

    if (!userLogged) {
      return res.status(401).json({
        msg: "Token invalido - user eliminado de la BD",
      });
    }

    if (userLogged.deleted) {
      return res.status(401).json({
        msg: "Token invalido - user con { state : false }",
      });
    }

    // Sirve para continuar con el siguiente MIDDLEWARE
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Error en analizar el Token.",
    });
  }
};

module.exports = {
  validateJWT,
};
