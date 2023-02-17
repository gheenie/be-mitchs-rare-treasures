const db = require("../db/index");


function fetchTreasures(sort_by) {
    const queryString = `SELECT * 
    FROM treasures 
    JOIN shops 
    USING (shop_id) 
    ORDER BY age ASC;`

    //sort_by !== undefined OR change sort_by param to default to age
    
    const validColumns = ['age'];

    // if validCols doesnt include sort_by return custom promise.reject
    
    // add last order by statement

    return db.query(queryString)
    .then(result => {
        return result.rows;
    });
}

module.exports = {
    fetchTreasures,
};
