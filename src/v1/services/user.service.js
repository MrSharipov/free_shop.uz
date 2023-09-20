const { generateToken } = require("../middleware/auth.middleware");
const usersModule = require("../module/users/user.module");

const register = async (user) => {
  const userForDb = {
    ...user,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const userDoc = await usersModule.create(userForDb);
  return generateToken(userDoc._id);
};

module.exports = {
  register,
};
