const db = require("../db/index");
const format = require("pg-format");

function fetchTreasures() {
    const queryString = `SELECT * FROM treasures;`
    
    return db.query(queryString)
    .then(result => {
        return result.rows;
    });
}

module.exports = {
    fetchTreasures,
};
