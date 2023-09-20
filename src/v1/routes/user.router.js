const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const v1UserController = require("../controllers/user.controller");
const { authentificate } = require("../middleware/auth.middleware");

router.use(bodyParser.json());

// register user
router.post("/register", (req, res) => v1UserController.register(req, res));

// login user
router.post("/login", authentificate, (req, res) =>
  res.json({ token: req.token })
);

// log out user
router.post("/logout", (req, res) => {
  res.send("LogOut request received");
});

module.exports = router;
