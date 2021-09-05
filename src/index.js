const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "hola :)" });
});

const characters = require("./controllers/characters");
app.get("/characters/:page?", characters);

const character = require("./controllers/character");
app.get("/character/:id", character);

const auth = require("./controllers/auth");
app.post("/login", auth.login);

const favorites = require("./controllers/favorites");
const authJwt = require("./authJwt");
app.get("/favorites", [authJwt.verifyToken], favorites.findAll);
app.post("/favorites", [authJwt.verifyToken], favorites.set);
