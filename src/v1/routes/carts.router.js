const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');
const {userAuthorization} = require('../middleware/auth.middleware');

router.use(bodyParser.json());

// register user
router.post('/', userAuthorization, (req, res) => cartsController.create(req, res));
router.get('/:id', userAuthorization, (req, res) => cartsController.getById(req, res));
router.put('/:id', userAuthorization, (req, res) => cartsController.update(req, res));
router.delete('/:id', userAuthorization, (req, res) => cartsController.deleteById(req, res));

module.exports = router;
