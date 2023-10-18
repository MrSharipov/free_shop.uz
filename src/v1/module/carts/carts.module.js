const CartModel = require("../../database/models/cart.schema");

const create = async (userId, products) => {
  return await CartModel.create({
    user_id: userId,
    products,
    created_at: Date.now(),
  });
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
