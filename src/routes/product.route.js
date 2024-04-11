const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { validateJWT, validateFields } = require("../validators");
const {
  getProducts,
  updateProduct,
  deleteProduct,
  postProduct,
} = require("../controllers/product.controller");

// ROUTES
router.get("/", [validateJWT], getProducts);
router.post(
  "/",
  [
    validateJWT,
    check("name", "El 'name' es requerido.").not().isEmpty(),
    check("sale_price", "El 'sale_price' es requerido.").not().isEmpty(),
    check("sale_price", "El 'sale_price' es de tipo numero.").isNumeric(),
    check("brand_id", "El 'brand_id' es requerido.").isMongoId(),
    check("model_id", "El 'model_id' es requerido.").isMongoId(),
    check("color_id", "El 'color_id' es requerido.").isMongoId(),
    check("size_id", "El 'size_id' es requerido.").isMongoId(),
    validateFields,
  ],
  postProduct
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  updateProduct
);
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
