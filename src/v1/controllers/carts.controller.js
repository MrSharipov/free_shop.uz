const mongoose = require("mongoose");
const errorHandle = require("../../helpers/error.service");
const cartsModule = require("../module/carts/carts.module");
const cartsService = require("../services/carts.service");

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
const getById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.json(errorHandle("id is not valid", 400, { id }));
  }
  try {
    const cart = await cartsModule.getById(id);
    if (!cart) {
      return res.json(errorHandle("cart is not found", 404, getById.name));
    }
    res.json(cart);
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const update = async (req, res) => {
  try {
    validateUpdateParams(req);
    const { products } = req.body;
    const cart = await cartsService.update(products);
    res.json(cart);
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.json(errorHandle("id is not valid", 400, { id }));
  }
  try {
    const result = await cartsModule.deleteById(id);
    if (result.modifiedCount === 0) {
      return res.json(errorHandle("cart is not found", 404, getById.name));
    }
    res.json({ status: "Deleted", cartId: id });
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

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

const validateUpdateParams = (req) => {
  const { products } = req.body;
  if (!Array.isArray(products)) {
    throw new Error("products is not valid (It should be type of Array)");
  }

  if (products.length === 0) {
    throw new Error("products' field is empty: Add more products to update");
  }
  products.forEach((product) => {
    if (!product.id || !product.quantity) {
      throw new Error("Each product should include id and quantity fields");
    }

    if (!mongoose.isValidObjectId(product.id)) {
      throw new Error("id is not valid");
    }

    if (product.quantity < 0) {
      throw new Error("quantity shouldn't be lower than zero");
    }
  });
};

module.exports = {
  create,
  update,
  getById,
  deleteById,
};
