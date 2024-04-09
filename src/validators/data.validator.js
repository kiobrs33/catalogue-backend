const User = require("../models/user.model");
const Role = require("../models/role.model");

const validateRol = async (roleId = "") => {
  const existRole = await Role.findById(roleId);

  console.log(existRole);

  if (!existRole) {
    throw new Error(`El 'rol' no existe en la base datos.`);
  }
};

const validateExistEmail = async (email = "") => {
  const isThereEmail = await User.findOne({ email });
  if (isThereEmail) {
    throw new Error(`El email: ${email} ya existe.`);
  }
};

const validateExistIdUser = async (id = "") => {
  const isThereId = await User.findById(id);

  if (!isThereId) {
    throw new Error(`El 'id' del usuario no existe.`);
  }
};

module.exports = {
  validateRol,
  validateExistEmail,
  validateExistIdUser,
};
