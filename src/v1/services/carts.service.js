const cartModule = require('../module/carts/carts.module');

const update = async (cartId, products) => {
	// Logic to update cart here...
	const result = products.filter((product) => {
		return product.deleted === false;
	});

	return await cartModule.update(cartId, result);
};

module.exports = {
	update,
};
