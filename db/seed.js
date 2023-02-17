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
		const treasuresWithShopId = prepareTreasuresData(treasureData, insertedShops);

		return insertTreasures(treasuresWithShopId);
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
			treasure_name VARCHAR(100) NOT NULL,
			colour VARCHAR(40) NOT NULL,
			age INT NOT NULL,
			cost_at_auction FLOAT(8) NOT NULL,
			shop_id INT REFERENCES shops(shop_id)
		);`
	);
}

function arrangeShopsData(shopData) {
	return shopData.map(shop => [shop.shop_name, shop.owner, shop.slogan]);
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

function prepareTreasuresData(treasureData, insertedShops) {
	if (treasureData.length === 0) return [];

	treasureData = JSON.parse( JSON.stringify(treasureData) );
	insertedShops = JSON.parse( JSON.stringify(insertedShops) );

	const shopsLookup = {};
	insertedShops.forEach(shop => shopsLookup[shop.shop_name] = shop.shop_id);

	return treasureData.map(treasure => {
		treasure.shop_id = shopsLookup[treasure.shop];
		
		delete treasure.shop;
		
		return treasure;
	});
}

function arrangeTreasuresData(treasures) {
	return treasures.map(treasure => [treasure.treasure_name, treasure.colour, treasure.age, treasure.cost_at_auction, treasure.shop_id]);
}

function insertTreasures(treasuresWithShopId) {
	const insertTreasuresStr = format(
		`INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id)
		VALUES %L
		RETURNING *;`,
		arrangeTreasuresData(treasuresWithShopId)
	);
	
	return db.query(insertTreasuresStr)
	.then(result => result.rows);
}



module.exports = {
	seed,
	arrangeShopsData,
	prepareTreasuresData,
	arrangeTreasuresData
};
