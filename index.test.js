// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');


//const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const request = require("supertest");
const { url } = require('inspector');


describe('./musicians endpoint', () => {
    // Write your tests here
    test("Testing Music endpoint", async () => {
        // Sends request to `/musicians` endpoint
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(responseData).toMatchObject(seedMusician);
    }) 
    test("should respond with correct Data", async () => {
        const response = await request(app).get("/musicians/1");
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData).toMatchObject(seedMusician[0]);
      });
      test("should delete the right element", async () => {
        const response = await request(app).delete("/musicians/1");
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData).toEqual(1);
      });

    
 

})


