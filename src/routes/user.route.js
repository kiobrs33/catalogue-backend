const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  getUsers,
  getOneUser,
  postUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

const {
  validateRol,
  hasRol,
  validateJWT,
  validateExistEmail,
  validateFields,
  validateExistIdUser,
  isAdminRol,
} = require("../validators");

// ROUTES
router.get("/", [validateJWT], getUsers);
router.get("/:id", [validateJWT], getOneUser);
router.post(
  "/",
  [
    check("name", "El 'name' es requerido.").not().isEmpty(),
    check("lastname", "El 'lastname' es requerido.").not().isEmpty(),
    check("email", "El 'email' no es valido.").isEmail(),
    check("email").custom(validateExistEmail),
    check("role_id", "El 'role_id' es requerido.").isMongoId(),
    check("role_id").custom(validateRol),
    check("password", "El 'password' debe tener más de 6 caracteres").isLength(
      6
    ),
    validateFields,
  ],
  postUser
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un 'id' valido.").isMongoId(),
    check("id").custom(validateExistIdUser),
    check("role_id").custom(validateRol).optional(),
    check("email", "El 'email' no es valido.").isEmail().optional(),
    check("email").custom(validateExistEmail).optional(),
    validateFields,
  ],
  updateUser
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "No es un 'id' valido").isMongoId(),
    check("id").custom(validateExistIdUser),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
