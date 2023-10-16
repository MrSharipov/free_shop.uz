const ProductModel = require("../../database/models/product.schema");
//Create user in DB
const create = async (product) => {
  const productDoc = await ProductModel.create(product);
  return productDoc;
};

const getById = async (product_id) => {
  const productDoc = await ProductModel.findById(product_id);
  return productDoc;
};

const getByPagination = async (page, size) => {
  const products = await ProductModel.find()
    .limit(size)
    .skip(page - 1);
  return products;
};

const update = async (id, data) => {
  const productDoc = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return productDoc;
};

module.exports = {
  create,
  getById,
  getByPagination,
  update,
};
