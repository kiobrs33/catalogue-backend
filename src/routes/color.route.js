const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {} = require("../controllers/role.controller");
const { validateJWT, isAdminRol, validateFields } = require("../validators");
const {
  getColors,
  updateColor,
  deleteColor,
  postColor,
} = require("../controllers/color.controller");

// ROUTES
router.get("/", [validateJWT], getColors);
router.post(
  "/",
  [
    validateJWT,
    isAdminRol,
    check("name", "El 'name' es requerido.").not().isEmpty(),
    validateFields,
  ],
  postColor
);
router.put(
  "/:id",
  [validateJWT, isAdminRol, check("id", "No es un 'id' valido.").isMongoId()],
  updateColor
);
router.delete(
  "/:id",
  [validateJWT, isAdminRol, check("id", "No es un 'id' valido.").isMongoId()],
  deleteColor
);

module.exports = router;
