const db = require("./index");
const format = require('pg-format');

const seed = ({ shopData, treasureData }) => {
	return db.query(`DROP TABLE IF EXISTS treasures;`)
	.then(() => {
		// drop any existing shops table
		return db.query(`DROP TABLE IF EXISTS shops;`);
	})
	// then: create some new tables - but which first and why?
	.then(() => {
		return createShops();
	})
	.then(() => {
		return createTreasures();
	})
	// then: insert the raw data into the tables.
	.then(() => {
		return insertShops(shopData);
	})
	.then((insertedShops) => {
		const lookUpShops = prepareTreasuresData(insertedShops, treasureData);
		return insertTreasures(lookUpShops);
	})
};

function createShops() {
	return db.query(
		`CREATE TABLE shops (
			shop_id SERIAL PRIMARY KEY,
			shop_name VARCHAR(40) NOT NULL,
			owner VARCHAR(40) NOT NULL,
			slogan TEXT
		);`
	);
}

function createTreasures() {
	return db.query(
		`CREATE TABLE treasures (
			treasure_id SERIAL PRIMARY KEY,
			treasure_name VARCHAR(40) NOT NULL,
			colour VARCHAR(40) NOT NULL,
			age INT NOT NULL,
			cost_at_auction FLOAT(8) NOT NULL,
			shop_id INT REFERENCES shops(shop_id)
		);`
	);
}

function insertShops(shopData) {
	const insertShopsStr = format(
		`INSERT INTO shops (shop_name, owner, slogan)
		VALUES %L
		RETURNING *;`,
		arrangeShopsData(shopData)
	);
	
	return db.query(insertShopsStr)
	.then(result => result.rows);
}

function arrangeShopsData(shopData) {
	return shopData.map(shop => [shop.shop_name, shop.owner, shop.slogan]);
}

function prepareTreasuresData(insertedShops, treasureData) {


}

function insertTreasures() {
	
	
}

module.exports = {
	seed,
	arrangeShopsData,
	prepareTreasuresData,
};
