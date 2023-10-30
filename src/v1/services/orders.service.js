const ordersModule = require('../module/orders/orders.module');

const create = async (data) => {
	const order = {
		user_id: data.userId,
		products: data.products,
		amount: data.amount,
		address: data.address,
		status: 'PENDING',
		created_at: Date.now(),
	};
	return await ordersModule.create(order);
};
const update = async (req, res) => {};
const getById = async (req, res) => {};
const deleteById = async (req, res) => {};

module.exports = {
	create,
	update,
	getById,
	deleteById,
};
