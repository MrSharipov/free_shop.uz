const mongoose = require("mongoose");
const errorHandle = require("../../helpers/error.service");
const cartsModule = require("../module/carts/carts.module");

const create = async (req, res) => {
  try {
    // const userId = req.user.id;
    const { userId, products } = req.body;

    validateCreateParams(userId, products);

    const cart = await cartsModule.create(userId, products);

    return res.json({ data: cart });
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};
const update = async (req, res) => {};
const getById = async (req, res) => {};
const deleteById = async (req, res) => {};

const validateCreateParams = (userId, products) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("userId is not valid");
  }
  if (!Array.isArray(products)) {
    throw new Error("products is not valid");
  }
  if (products.length === 0) {
    throw new Error("product list is empty");
  }
  products.forEach((product) => {
    // check same productIds and as ObjectId
    // quantity( >= 1)
    if (!product.productId || !product.quantity) {
      throw new Error(
        "Each product should include productId and quantity fields"
      );
    }
  });
};

module.exports = {
  create,
  update,
  getById,
  deleteById,
};
