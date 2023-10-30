const mongoose = require('mongoose');
const errorHandle = require('../../helpers/error.service');
const cartsModule = require('../module/carts/carts.module');
const cartsService = require('../services/carts.service');

const create = async (req, res) => {
	try {
		// const userId = req.user.id;
		const {userId, products} = req.body;

		validateCreateParams(userId, products);

		const cart = await cartsModule.create(userId, products);

		return res.json({data: cart});
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
		const cart = await cartsModule.getById(id);
		if (!cart) {
			return res.json(errorHandle('cart is not found', 404, getById.name));
		}
		res.json(cart);
	} catch (err) {
		return res.json(errorHandle(err.message, 500, err.name));
	}
};

const update = async (req, res) => {
	try {
		validateUpdateParams(req);
		const cartId = req.params.id;
		const {products} = req.body;
		const result = await cartsService.update(cartId, products);
		if (result.matchedCount === 0) {
			return res.json(errorHandle('cart is not found', 404, update.name));
		}
		if (result.modifiedCount === 0) {
			return res.json(errorHandle('cart already updated', 400, update.name));
		}
		res.json({status: 'Updated', cartId});
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
		const result = await cartsModule.deleteById(id);
		if (result.matchedCount === 0) {
			return res.json(errorHandle('cart is not found', 404, getById.name));
		}
		res.json({status: 'Deleted', cartId: id});
	} catch (err) {
		return res.json(errorHandle(err.message, 500, err.name));
	}
};

const validateCreateParams = (userId, products) => {
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

const validateUpdateParams = (req) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		throw new Error('cartId is not valid');
	}
	const {products} = req.body;
	if (!Array.isArray(products)) {
		throw new Error('products is not valid (It should be type of Array)');
	}

	if (products.length === 0) {
		throw new Error("products' field is empty: Add more products to update");
	}
	products.forEach((product) => {
		if (!product.id || (!product.quantity && product.quantity !== 0)) {
			throw new Error('Each product should include id and quantity fields');
		}

		if (!mongoose.isValidObjectId(product.id)) {
			throw new Error('id is not valid');
		}

		if (product.quantity <= 0) {
			throw new Error("quantity shouldn't be lower than zero");
		}
		if (!product.deleted && product.deleted !== false) {
			throw new Error('deleted field should be defined');
		}
	});
};

module.exports = {
	create,
	update,
	getById,
	deleteById,
};
