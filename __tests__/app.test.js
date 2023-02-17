const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/index");
const testData = require("../db/data/test-data/index");
const { seed } = require("../db/seed");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("GET: /api/treasures", () => {
    it("200; returns the correct highest level JSON", () => {
        return request(app)
        .get("/api/treasures")
        .expect(200)
        .then((response) => {
            const body = response.body;

            expect(body).toHaveProperty("treasures");
            expect(body.treasures).toBeInstanceOf(Array);
        });
    });

    it("200; returns the treasures correctly joined", () => {
        return request(app)
        .get("/api/treasures")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            
            expect(treasures).toHaveLength(26);

            treasures.forEach((treasure) => {
                expect(treasure).toMatchObject({
                    treasure_id: expect.any(Number),
                    treasure_name: expect.any(String),
                    colour: expect.any(String),
                    age: expect.any(Number),
                    cost_at_auction: expect.any(Number),
                    shop_name: expect.any(String),
                });
            });
        });
    });

    it("200; returns treasures sorted by age and ASC by default", () => {
        return request(app)
        .get("/api/treasures")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];

            treasuresCopy.sort((treasureOne, treasureTwo) => {
                return treasureOne.age - treasureTwo.age;
            })

            expect(treasuresCopy).toEqual(treasures);
        });
    });

    it("200; accepts sort_by query of age; sorted ASC by default", () => {
        return request(app)
        .get("/api/treasures?sort_by=age")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];

            treasuresCopy.sort((treasureOne, treasureTwo) => {
                return treasureOne.age - treasureTwo.age;
            })

            expect(treasuresCopy).toEqual(treasures);
        });
    });

    it("200; accepts sort_by query of cost_at_auction; sorted ASC by default", () => {
        return request(app)
        .get("/api/treasures?sort_by=cost_at_auction")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];

            treasuresCopy.sort((treasureOne, treasureTwo) => {
                return treasureOne.cost_at_auction - treasureTwo.cost_at_auction;
            })

            expect(treasuresCopy).toEqual(treasures);
        });
    });

    it("200; accepts sort_by query of treasure_name; sorted ASC by default", () => {
        return request(app)
        .get("/api/treasures?sort_by=treasure_name")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];
            
            treasuresCopy.sort((treasureOne, treasureTwo) => {
                if (treasureOne.treasure_name < treasureTwo.treasure_name) return -1;
                if (treasureOne.treasure_name > treasureTwo.treasure_name) return 1;
                return 0;
            });
            expect(treasuresCopy).toEqual(treasures);
        });
    });
    it("200; accepts order query of desc sorted age by default", () => {
        return request(app)
        .get("/api/treasures?order=desc")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];
            treasuresCopy.sort((treasureOne, treasureTwo) => {
                return treasureTwo.age - treasureOne.age;
            });
            expect(treasuresCopy).toEqual(treasures);
        });
    });
    it("200; accepts order query of desc and sort_by query", () => {
        return request(app)
        .get("/api/treasures?order=desc&sort_by=cost_at_auction")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];
            treasuresCopy.sort((treasureOne, treasureTwo) => {
                return treasureTwo.cost_at_auction - treasureOne.cost_at_auction;
            });
            expect(treasuresCopy).toEqual(treasures);
        });
    });
    it("200; accepts colour query and returns filtered treasures", () => {
        return request(app)
        .get("/api/treasures?colour=gold")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];
            treasuresCopy.sort((treasureOne, treasureTwo) => {
                return treasureOne.age - treasureTwo.age;
            });
            expect(treasuresCopy).toEqual(treasures);
            treasures.forEach((treasure) => {
                expect(treasure.colour).toBe("gold")
            })
        });
    });
});
