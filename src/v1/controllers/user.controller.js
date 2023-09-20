const bcrypt = require("bcrypt");

const v1UserService = require("../services/user.service");

const register = async (req, res) => {
  const { body } = req;
  if (!body.email || !body.userName || !body.password) {
    return res.status(500).send({
      status: "ERROR",
      message: "email, userName or password is NOT FOUND",
    });
  }
  const newUser = {
    email: body.email,
    userName: body.userName,
    password: await bcrypt.hash(body.password, 10),
  };

  if (body.name) {
    newUser.name = body.name;
  }

  const user = await v1UserService.register(newUser);

  return res.status(201).send({ status: "OK", data: user });
};

module.exports = {
  register,
};
