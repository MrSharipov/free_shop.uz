const mongoose = require("mongoose");
const { getObjectWith3Lang } = require("../../helpers/validator");
const productsService = require("../services/products.service");
const productsModule = require("../module/products/products.module");
const errorHandle = require("../../helpers/error.service");
const handleError = require("../../helpers/error.service");

const create = async (req, res) => {
  try {
    //check payload
    const product = validateProductCreateInput(req, res);
    //create product
    const newProduct = await productsService.create(product);
    // return product
    return res.json(newProduct);
  } catch (err) {
    res.json(handleError(err.message, 400, err.name));
  }
};

const getById = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.isValidObjectId(productId)) {
    return res.json(errorHandle("productId is not valid", 500, { productId }));
  }
  try {
    const product = await productsService.getById(productId);
    if (!product) {
      return res.json(errorHandle("Product is not found", 500, {}));
    }
    return res.json(product);
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const getByPagination = async (req, res) => {
  const { page, size } = req.query;
  try {
    const products = await productsService.getByPagination(page, size);
    return res.json(products);
  } catch (err) {
    res.json(handleError(err.message, 500, { method: getByPagination.name }));
  }
};

const update = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.isValidObjectId(productId)) {
    return res.json(errorHandle("productId is not valid", 500, { productId }));
  }
  try {
    const product = await productsService.getById(productId);

    if (!product) {
      return res.json(errorHandle("Product is not found", 500, {}));
    }

    const data = validateUpdateParams(req);
    const updatedProduct = await productsService.update(productId, data);

    return res.json(updatedProduct);
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const search = async (req, res) => {
  const { searchText } = req.body;
  if (!searchText) {
    return res.json({ data: [] });
  }
  try {
    const result = await productsModule.search(searchText);
    return res.json({ data: result });
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const validateProductCreateInput = (req, res) => {
  const {
    title,
    name,
    sku,
    desc,
    category,
    price,
    manifucturer_id,
    discount_id,
  } = req.body;

  let resultData = {};

  if (!title) throw new Error("title is not found");

  if (!getObjectWith3Lang(title)) {
    throw new Error("title is not valid");
  }

  resultData.title = title;

  if (!name) throw new Error("name is not found");
  //check name with regex
  resultData.name = name;

  if (!sku) throw new Error("sku is not found");
  resultData.sku = sku;

  if (!desc) throw new Error("desc is not found");

  if (!getObjectWith3Lang(desc)) {
    throw new Error("desc is not valid");
  }
  resultData.desc = desc;

  if (!category) throw new Error("category is not found");

  if (!mongoose.isValidObjectId(category))
    throw new Error("category is not valid");

  resultData.category = category;

  if (!price) throw new Error("price is not found");
  resultData.price = price;

  if (manifucturer_id) {
    if (!mongoose.isValidObjectId(manifucturer_id)) {
      throw new Error("manifucturer_id is not valid");
    }
    resultData.manifucturer_id = manifucturer_id;
  }

  if (discount_id) {
    if (!mongoose.isValidObjectId(discount_id)) {
      throw new Error("discount_id is not valid");
    }
    resultData.discount_id = discount_id;
  }

  return resultData;
};

const validateUpdateParams = (req) => {
  const {
    title,
    name,
    SKU,
    status,
    desc,
    category,
    price,
    manifucturer_id,
    discount_id,
  } = req.body;

  const updateData = {};

  if (title) {
    if (!getObjectWith3Lang(title)) {
      throw new Error("title is not valid");
    }
    updateData.title = title;
  }

  if (name) updateData.name = name;
  if (SKU) updateData.SKU = SKU;
  if (status) updateData.status = status;

  if (desc) {
    if (!getObjectWith3Lang(desc)) {
      throw new Error("desc is not valid");
    }
    updateData.desc = desc;
  }

  if (category) {
    if (!mongoose.isValidObjectId(category))
      throw new Error("category is not valid");
    updateData.category = category;
  }

  if (price) updateData.price = price;

  if (manifucturer_id) {
    if (!mongoose.isValidObjectId(manifucturer_id)) {
      throw new Error("manifucturer_id is not valid");
    }
    updateData.manifucturer_id = manifucturer_id;
  }

  if (discount_id) {
    if (!mongoose.isValidObjectId(discount_id)) {
      throw new Error("discount_id is not valid");
    }
    updateData.discount_id = discount_id;
  }

  return updateData;
};

module.exports = {
  create,
  getById,
  getByPagination,
  update,
  search,
};
