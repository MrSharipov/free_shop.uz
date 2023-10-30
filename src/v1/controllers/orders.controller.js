const errorHandle = require('../../helpers/error.service');
const mongoose = require('mongoose');
const ordersService = require('../services/orders.service');
const ordersModule = require('../module/orders/orders.module');

const create = async (req, res) => {
	try {
		// const userId = req.user.id;
		const {userId, products, amount, address} = req.body;

		validateCreateParams(userId, products, amount, address);

		const order = await ordersService.create({userId, products, amount, address});

		return res.json({data: order});
	} catch (err) {
		return res.json(errorHandle(err.message, 500, err.name));
	}
};
const update = async (req, res) => {
	try {
		const {order_id, status} = req.body;

		if (!order_id) throw new Error('order_id is not found');
		if (!mongoose.isValidObjectId(order_id)) {
			throw new Error('order_id is not valid');
		}

		switch (status) {
			case 'PENDING':
				break;
			case 'PAID':
				break;
			case 'PROCCESSING':
				break;
			case 'CANCELLED':
				break;
			case 'SUCCESS':
				break;

			default:
				throw new Error('status is invalid');
		}
		const result = ordersModule.update(order_id, status);
		if (result.matchedCount === 0) {
			throw new Error('order is not found');
		}
		res.json({status: 'Updated', order_id});
	} catch (err) {
		return res.json(errorHandle(err.message, 500, err.name));
	}
};
const getById = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.isValidObjectId(id)) {
		return res.json(errorHandle('id is not valid', 400, {id}));
	}
	try {
		const order = await ordersModule.getById(id);
		if (!order) {
			return res.json(errorHandle('order is not found', 404, getById.name));
		}
		res.json(order);
	} catch (err) {
		return res.json(errorHandle(err.message, 500, err.name));
	}
};
const deleteById = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.isValidObjectId(id)) {
		return res.json(errorHandle('id is not valid', 400, {id}));
	}
	try {
		const result = await ordersModule.deleteById(id);
		if (result.matchedCount === 0) {
			return res.json(errorHandle('order is not found', 404, getById.name));
		}
		res.json({status: 'Deleted', orderId: id});
	} catch (err) {
		return res.json(errorHandle(err.message, 500, err.name));
	}
};

const validateCreateParams = (userId, products, amount, address) => {
	if (!amount) throw new Error('amount is not defined');
	if (!address) throw new Error('address is not defined');
	if (!mongoose.isValidObjectId(userId)) {
		throw new Error('userId is not valid');
	}
	if (!Array.isArray(products)) {
		throw new Error('products is not valid');
	}
	if (products.length === 0) {
		throw new Error('product list is empty');
	}
	products.forEach((product) => {
		// check same productIds

		if (!product.productId || !product.quantity || product.quantity < 0) {
			throw new Error('Each product should include productId and quantity fields');
		}

		if (!mongoose.isValidObjectId(product.productId)) {
			throw new Error('productId is not valid');
		}
	});
};

module.exports = {
	create,
	update,
	getById,
	deleteById,
};
