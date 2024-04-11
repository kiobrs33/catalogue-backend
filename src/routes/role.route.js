const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  getRoles,
  deleteRole,
  postRole,
  updateRole,
} = require("../controllers/role.controller");
const { validateJWT, isAdminRol, validateFields } = require("../validators");

// ROUTES
router.get("/", [validateJWT], getRoles);
router.post(
  "/",
  [
    validateJWT,
    isAdminRol,
    check("name", "El 'name' es requerido.").not().isEmpty(),
    validateFields,
  ],
  postRole
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  updateRole
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRol,
    check("id", "No es un 'id' valido.").isMongoId(),
    validateFields,
  ],
  deleteRole
);

module.exports = router;
