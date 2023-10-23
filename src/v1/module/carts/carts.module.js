const CartModel = require("../../database/models/cart.schema");

const create = async (userId, products) => {
  return await CartModel.create({
    user_id: userId,
    products,
    created_at: Date.now(),
  });
};
const getById = async (id) => {
  return await CartModel.findOne({ _id: id, status: "CREATED" });
};

const update = async (req, res) => {};

const deleteById = async (id) => {
  return await CartModel.updateOne(
    { _id: id, status: "CREATED" },
    { status: "DELETED" },
    { new: true }
  );
};

module.exports = {
  create,
  update,
  getById,
  deleteById,
};
