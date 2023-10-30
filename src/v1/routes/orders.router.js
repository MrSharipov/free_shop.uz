const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const {userAuthorization, adminAuthorization} = require('../middleware/auth.middleware');

router.use(bodyParser.json());

// register user
router.post('/', userAuthorization, (req, res) => ordersController.create(req, res));
router.get('/:id', userAuthorization, (req, res) => ordersController.getById(req, res));
router.delete('/:id', adminAuthorization, (req, res) => ordersController.deleteById(req, res));
router.put('/:id', adminAuthorization, (req, res) => ordersController.update(req, res));
//delete route
module.exports = router;
