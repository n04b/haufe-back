const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { serverError } = require("../helpers/handlers");

const db = require("../models");
const config = require("../../auth.config");

const Users = db.users;

exports.login = (req, res) => {
  if (!req.body.user || !req.body.password) {
    return res.status(401).send({
      message: "Invalid Password",
    });
  }

  Users.findOne({
    where: {
      user: req.body.user,
    },
  })
    .then((response) => {
      if (!response) {
        return res.status(401).send({ message: "Invalid Password" });
      }
      const user = response.dataValues;

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      res.status(200).send({
        id: user.id,
        user: user.user,
        accessToken: token,
      });
    })
    .catch(serverError(res));
};
