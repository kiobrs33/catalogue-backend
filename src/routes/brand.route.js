const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  getBrands,
  postBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");
const { validateJWT, isAdminRol, validateFields } = require("../validators");

// ROUTES
router.get("/", [validateJWT], getBrands);
router.post(
  "/",
  [
    validateJWT,
    isAdminRol,
    check("name", "El 'name' es requerido.").not().isEmpty(),
    validateFields,
  ],
  postBrand
);
router.put(
  "/:id",
  [validateJWT, isAdminRol, check("id", "No es un 'id' valido.").isMongoId()],
  updateBrand
);
router.delete(
  "/:id",
  [validateJWT, isAdminRol, check("id", "No es un 'id' valido.").isMongoId()],
  deleteBrand
);

module.exports = router;
