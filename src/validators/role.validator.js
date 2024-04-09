const { request, response } = require("express");
const { ADMIN_ROLE } = require("../data/data");

const isAdminRol = (req = request, res = response, next) => {
  // Validar la informacion del user logeado
  if (!req.userLogged) {
    return res.status(500).json({
      msg: "Se quiere validar el Role, pero el token is inválido.",
    });
  }

  const { role_id } = req.userLogged;

  // Validar que solo sea el ADMIN_ROLE
  if (role_id.name !== ADMIN_ROLE) {
    return res.status(401).json({
      msg: `Lo sentimos, pero no eres el administrador.`,
    });
  }

  // Sirve para continuar con el siguiente MIDDLEWARE
  next();
};

// TODO OJO
const hasRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.userLogged) {
      return res.status(500).json({
        msg: "Se quiere validar el Role, pero el token es inválido.",
      });
    }

    if (!roles.includes(req.userLogged.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}.`,
      });
    }

    console.log(req.userLogged);

    // Sirve para continuar con el siguiente MIDDLEWARE
    next();
  };
};

module.exports = {
  isAdminRol,
  hasRol,
};
