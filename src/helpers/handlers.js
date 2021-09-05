exports.requestSucceeded = (res) => () => {
  res.status(204).send();
};

exports.serverError = (res) => (error) => {
  res.status(500).send({
    message: error.message,
  });
};
