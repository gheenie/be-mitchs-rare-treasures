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

    it("200; returns the treasures correctly joined with shops", () => {
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

    it("200; returns treasures sorted by age, and ASC by default", () => {
        return request(app)
        .get("/api/treasures")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            expect(treasures).toBeSortedBy('age');
        });
    });

    it("200; accepts sort_by query of age; sorted ASC by default", () => {
        return request(app)
        .get("/api/treasures?sort_by=age")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            expect(treasures).toBeSortedBy('age');
        });
    });

    it("200; accepts sort_by query of cost_at_auction; sorted ASC by default", () => {
        return request(app)
        .get("/api/treasures?sort_by=cost_at_auction")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            expect(treasures).toBeSortedBy('cost_at_auction');
        });
    });

    it("200; accepts sort_by query of treasure_name; sorted ASC by default", () => {
        return request(app)
        .get("/api/treasures?sort_by=treasure_name")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            expect(treasures).toBeSortedBy('treasure_name');
        });
    });

    it("200; accepts order query of desc; sorted by age by default", () => {
        return request(app)
        .get("/api/treasures?order=desc")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            expect(treasures).toBeSortedBy('age', { descending: true });
        });
    });

    it("200; accepts order query; and sort_by query", () => {
        return request(app)
        .get("/api/treasures?order=desc&sort_by=cost_at_auction")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            expect(treasures).toBeSortedBy('cost_at_auction', { descending: true });
        });
    });

    it("200; accepts colour query and returns filtered treasures", () => {
        return request(app)
        .get("/api/treasures?colour=gold")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            treasures.forEach((treasure) => {
                expect(treasure.colour).toBe("gold");
            })

            expect(treasures).toBeSortedBy('age');
        });
    });

    it("200; accepts age query and returns filtered treasures", () => {
        return request(app)
        .get("/api/treasures?age=13")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;
            const treasuresCopy = [...treasures];

            treasuresCopy.sort((treasureOne, treasureTwo) => {
                return treasureOne.age - treasureTwo.age;
            });

            expect(treasuresCopy).toEqual(treasures);

            treasures.forEach((treasure) => {
                expect(treasure.age).toBe(13);
            })
        });
    });

    it("200; accepts age and colour queries and WHERE filtering works for both", () => {
        return request(app)
        .get("/api/treasures?age=13&colour=gold")
        .expect(200)
        .then((response) => {
            const treasures = response.body.treasures;

            treasures.forEach((treasure) => {
                expect(treasure.age).toBe(13);
                expect(treasure.colour).toBe('gold');
            })

            expect(treasures).toBeSortedBy('age');
        });
    });

    it("404; the sort_by query is not a valid ORDER BY column", () => {
        return request(app)
        .get("/api/treasures?sort_by=1234")
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Invalid sort query');
        });
    });

    it("404; the order query is not a valid ORDER BY value", () => {
        return request(app)
        .get("/api/treasures?order=DeSc")
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Invalid order query');
        });
    });

    it("404; the colour value does not return any treasures after WHERE filtering", () => {
        return request(app)
        .get("/api/treasures?colour=1234")
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found');
        });
    });

    it("400; the age value is invalid for WHERE filtering", () => {
        return request(app)
        .get("/api/treasures?age=notAnInt")
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
        });
    });
});
