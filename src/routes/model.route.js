const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  getModels,
  postModel,
  updateModel,
  deleteModel,
} = require("../controllers/model.controller");
const { validateJWT, isAdminRol, validateFields } = require("../validators");

// ROUTES
router.get("/", [validateJWT], getModels);
router.post(
  "/",
  [
    validateJWT,
    isAdminRol,
    check("name", "El 'name' es requerido.").not().isEmpty(),
    validateFields,
  ],
  postModel
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  updateModel
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  deleteModel
);

module.exports = router;
