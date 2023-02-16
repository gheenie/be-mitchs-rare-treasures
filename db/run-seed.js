const data = require('./data/dev-data');
const seed = require('./seed');

const db = require('./index');

seed(data).then(() => db.end());
