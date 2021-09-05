const axios = require("axios");
const { serverError } = require("../helpers/handlers");

module.exports = (req, res) => {
  const page = req.params.page || 1;

  axios
    .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch(serverError(res));
};
