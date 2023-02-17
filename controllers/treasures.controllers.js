const {
    fetchTreasures,
  } = require("../models/treasures.models");

function getTreasures(request, response, next) {
    const { sort_by } = request.query;
    
    fetchTreasures(sort_by)
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