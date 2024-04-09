const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { postLogin } = require("../controllers/auth.controller");

const { validateFields } = require("../validators");

router.post(
  "/login",
  [
    check("email", "El email no es valido").isEmail(),
    check("password", "El passowrd es invalido").not().isEmpty(),
    validateFields,
  ],
  postLogin
);

module.exports = router;
