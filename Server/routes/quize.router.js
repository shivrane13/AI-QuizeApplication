const express = require("express");
const router = express.Router();
const quizeController = require("../controllers/quize.controller");

router.post("/", quizeController.getQuzie);
router.post("/saveHistory", quizeController.createHistory);
router.get("/getAllHistory", quizeController.getAllHistory);

module.exports = router;
