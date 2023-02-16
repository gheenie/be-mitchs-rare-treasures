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

    it("200; returns the original treasures columns", () => {
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
                    shop_id: expect.any(Number),
                });
            });
        });
    });

    it("404?", () => {
        
    });
});
