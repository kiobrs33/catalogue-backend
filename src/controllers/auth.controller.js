const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user.model");

const { generateJWT } = require("../helpers/generate-jwt");

const postLogin = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    // Verifica si el email existe
    const user = await User.findOne({ email }).populate("role_id");

    if (!user) {
      return res.status(400).json({
        msg: "El passowrd o email son incorrectos - email",
      });
    }

    // Verifica si el USER aún existe o fue eliminado
    if (user.deleted) {
      return res.status(400).json({
        msg: "El passowrd o email son incorrectos - { deleted :  true }",
      });
    }

    // Verificar el password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El passowrd o email son incorrectos - password",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.status(200).json({
      msg: "OK User logged",
      user,
      token,
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
  postLogin,
};
