const jwt = require("jsonwebtoken");
const db = require("../models");
const { requestSucceeded, serverError } = require("../helpers/handlers");

const Favorites = db.favorites;

exports.findAll = (req, res) => {
  const token = req.headers["x-access-token"];
  const { id } = jwt.decode(token);

  Favorites.findAll({
    attributes: ["character", "selected"],
    where: {
      user: id,
      selected: true,
    },
  })
    .then((response) => {
      res.send(response);
    })
    .catch(serverError(res));
};

exports.set = (req, res) => {
  const token = req.headers["x-access-token"];
  const { id: user } = jwt.decode(token);
  const { id: character, selected } = req.body;

  if (!character || selected === undefined || typeof selected !== "boolean") {
    res.status(400).send({ message: "Bad Request" });
  }

  Favorites.findOne({
    where: {
      character,
      user,
    },
  }).then((response) => {
    if (response) {
      response
        .update({ selected })
        .then(requestSucceeded(res))
        .catch(serverError(res));
    } else {
      Favorites.create({ user, character, selected })
        .then(requestSucceeded(res))
        .catch(serverError(res));
    }
  });
};
