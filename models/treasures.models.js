const { query } = require("../db/index");
const db = require("../db/index");


function fetchTreasures(sort_by = "age", order = "asc", colour) {
    let queryString = `SELECT * 
    FROM treasures 
    JOIN shops 
    USING (shop_id) `

    
    const queryValues = [];
    if (colour !== undefined) {
       queryValues.push(colour);
       queryString += `WHERE colour = $1 `
    }
    const validSortColumns = ['age', 'cost_at_auction', 'treasure_name'];
    const validOrders = ['asc', 'desc'];


    if (!validSortColumns.includes(sort_by)) {
        return Promise.reject({
            status: 404,
            msg: `Invalid sort query`,
          });
    }
    if (!validOrders.includes(order)) {
        return Promise.reject({
            status: 404,
            msg: `Invalid order query`,
          });
    }
    
    queryString += `ORDER BY ${sort_by} ${order};`

    return db.query(queryString, queryValues)
    .then(result => {
        return result.rows;
    });
}

module.exports = {
    fetchTreasures,
};
