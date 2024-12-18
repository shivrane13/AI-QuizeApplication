const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getLogedInUser,
} = require("../controllers/user.controller");

router.post("/createuser", createUser);
router.post("/loginuser", loginUser);
router.get("/getLogedInUser", getLogedInUser);

module.exports = router;
