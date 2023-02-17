const express = require("express");
const {
  getTreasures,
} = require("./controllers/treasures.controllers");
const { 
    handlePsqlErrors,
    handleCustomErrors, 
    handleServerErrors 
} = require("./controllers/errors.controllers");

const app = express();

app.use(express.json());

app.get('/api/treasures', getTreasures);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
