const UserModel = require("../../database/models/user.schema");

const create = async (user) => {
  const userDoc = await UserModel.create(user);
  return userDoc;
};

const findOne = async (query) => {
  return await UserModel.findOne(query);
};

module.exports = {
  create,
  findOne,
};
