const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  getRegisters,
  postRegister,
  getOneRegister,
} = require("../controllers/register.controller");
const { validateJWT, isAdminRol, validateFields } = require("../validators");

// ROUTES
router.get("/", [validateJWT], getRegisters);
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  getOneRegister
);
router.post(
  "/",
  [
    validateJWT,
    check("user_id", "El 'user_id' es requerido.").not().isEmpty(),
    check("user_id", "El 'user_id' no es correcto.").isMongoId(),
    check("details", "Debe haber 1 detail product como mínimo.").isArray({
      min: 1,
    }),
    validateFields,
  ],
  postRegister
);

module.exports = router;
