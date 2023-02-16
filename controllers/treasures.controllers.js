const {
    fetchTreasures,
  } = require("../models/treasures.models");

function getTreasures(request, response, next) {
    fetchTreasures()
    .then(treasures => {
        response.status(200).send({ treasures });
    })
    .catch(err => {
        next(err);
    });
}

module.exports = {
    getTreasures,
};