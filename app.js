const express = require("express");
const {
  getTreasures,
} = require("./controllers/treasures.controllers");
const {  } = require("./controllers/errors.controllers");

const app = express();

app.use(express.json());

app.get('/api/treasures', getTreasures);

module.exports = app;
