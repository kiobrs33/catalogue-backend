const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  getSizes,
  postSize,
  updateSize,
  deleteSize,
} = require("../controllers/size.controller");
const { validateJWT, isAdminRol, validateFields } = require("../validators");

// ROUTES
router.get("/", [validateJWT], getSizes);
router.post(
  "/",
  [
    validateJWT,
    isAdminRol,
    check("name", "El 'name' es requerido.").not().isEmpty(),
    validateFields,
  ],
  postSize
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  updateSize
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  deleteSize
);

module.exports = router;
