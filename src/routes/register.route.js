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
  [validateJWT, check("id", "No es un 'id' valido.").isMongoId()],
  getOneRegister
);
router.post(
  "/",
  [
    validateJWT,
    check("user_id", "El 'user_id' es requerido.").not().isEmpty(),
    check("date", "El 'date' es requerido.").not().isEmpty(),
    check("details", "Debe haber 1 detail product como mínimo.").isArray({
      min: 1,
    }),
    validateFields,
  ],
  postRegister
);

module.exports = router;
