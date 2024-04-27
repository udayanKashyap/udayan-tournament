const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  };

  res.status(statusCode).send(response);
};

module.exports = errorHandler;
