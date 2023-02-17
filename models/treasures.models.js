const db = require("../db/index");


function fetchTreasures(sort_by) {
    const validColumns = ['age']
    const queryString = `SELECT * FROM treasures JOIN shops USING (shop_id) ORDER BY age ASC;`
    return db.query(queryString)
    .then(result => {
        return result.rows;
    });
}

module.exports = {
    fetchTreasures,
};
