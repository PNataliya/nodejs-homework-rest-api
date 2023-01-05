const statusCode = require("./createError");

const RequestError = (status, message = statusCode[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = { RequestError };
