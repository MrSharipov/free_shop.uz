const OrderModel = require('../../database/models/order.schema');
const create = async (order) => {
	return await OrderModel.create(order);
};
const update = async (order_id, status) => {
	return await OrderModel.updateOne({_id: order_id}, {status});
};
const getById = async (id) => {
	return await OrderModel.findById(id);
};
const deleteById = async (id) => {
	return await OrderModel.updateOne({_id: id, status: 'PENDING'}, {status: 'DELETED'});
};

module.exports = {
	create,
	update,
	getById,
	deleteById,
};
