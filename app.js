const express = require("express");
const {
  getTreasures,
} = require("./controllers/treasures.controllers");
const { handle404StatusCodes, handle500StatusCodes } = require("./controllers/errors.controllers");

const app = express();

app.use(express.json());

app.get('/api/treasures', getTreasures);

app.use(handle404StatusCodes);

app.use(handle500StatusCodes);

module.exports = app;
