const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			enum: ['PENDING', 'PAID', 'CANCELLED', 'PROCCESSING', 'SUCCESS'],
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		products: {
			type: Array,
			required: true,
		},

		amount: {
			type: Number,
			required: true,
		},

		address: {
			type: String,
			required: true,
		},

		created_at: {
			type: Number,
			required: true,
		},
		updated_at: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{versionKey: false},
);

module.exports = mongoose.model('Order', orderSchema);
