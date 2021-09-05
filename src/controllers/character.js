const axios = require("axios");
const { serverError } = require("../helpers/handlers");

module.exports = (req, res) => {
  const id = req.params.id;

  axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch(serverError(res));
};
