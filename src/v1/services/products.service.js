const productsModule = require("../module/products/products.module");
const create = async (product) => {
  //Prepare data for DB
  const productForDb = {
    ...product,
    status: "active",
    discount_id: null,
    created_at: Date.now(),
  };
  //Send ready data to the userModule to create it in DB
  const productDoc = await productsModule.create(productForDb);
  return productDoc;
};

const getById = async (product_id) => {
  return await productsModule.getById(product_id);
};

const getByPagination = async (page, size) => {
  return await productsModule.getByPagination(page, size);
};

const update = async (product_id, updateData) => {
  return await productsModule.update(product_id, updateData);
};

module.exports = {
  create,
  getById,
  getByPagination,
  update,
};
