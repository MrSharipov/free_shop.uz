const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cartsController = require("../controllers/carts.controller");

router.use(bodyParser.json());

// register user
router.post("/", (req, res) => cartsController.create(req, res));
router.get("/:id", (req, res) => cartsController.getById(req, res));
router.put("/:id", (req, res) => cartsController.update(req, res));
router.delete("/:id", (req, res) => cartsController.deleteById(req, res));

module.exports = router;
