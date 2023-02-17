const {
    fetchTreasures,
  } = require("../models/treasures.models");

function getTreasures(request, response, next) {
    const { sort_by, order, colour } = request.query;
    
    fetchTreasures(sort_by, order, colour)
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