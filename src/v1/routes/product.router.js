const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const productsController = require("../controllers/products.controller");

router.use(bodyParser.json());

// register user
router.post("/", (req, res) => productsController.create(req, res));
router.get("/", (req, res) => productsController.getByPagination(req, res));
router.get("/:id", (req, res) => productsController.getById(req, res));
router.get("/search/all", (req, res) => productsController.search(req, res));
router.put("/:id", (req, res) => productsController.update(req, res));

module.exports = router;
