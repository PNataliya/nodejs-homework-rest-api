const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { RequestError } = require("../helpers/RequestError");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(token);
  if (bearer !== "Bearer") {
    throw RequestError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || token !== String(user.token)) {
      console.log(token);
      console.log(user.token);
      throw RequestError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
