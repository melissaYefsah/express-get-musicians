// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');

const request = require("supertest");
const app = require("./src/app");
const  {Musician}  = require("./models/index.js");
const syncSeed = require("./seed.js");
let restQuantity;


beforeAll(async() =>{
    await syncSeed();
    const musician = await Musician.findAll({});
    restQuantity  = musician.length
});

    test("should return 200 on get" , async()=>{
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toEqual(200);
    });
    test("should return all Musicians" , async()=>{
        const response = await request(app).get('/musicians');
        expect(response.body[0].instrument).toBe('Voice');
    });
    test("should return correct number of musicians" , async()=>{
        const response = await request(app).get('/musicians');
        expect(response.body.length).toEqual(restQuantity);
    });
    test("should return correct musicians data", async () => {
        const response = await request(app).get('/musicians');
        expect(response.body).toContainEqual(
            expect.objectContaining({
              id:2,
              name: 'Drake',
              instrument: 'Voice',
            })
        );
    });
    test("should return correct musicians" , async()=>{
        const response = await request(app).get('/musicians/2');
        expect(response.body).toEqual(
            expect.objectContaining({
              id:2,
              name: 'Drake',
              instrument: 'Voice',
            })
        )
    });
    test("should return a larger array of musicians", async () => {
        let currentResponse = await request(app).get('/musicians');
        const restQuantity = currentResponse.body.length;
        const addResponse = await request(app)
            .post("/musicians")
            .send({name: 'lola',instrument:'Voice'});
        console.log(addResponse.body);
        const newResponse = await request(app).get('/musicians');
        expect(newResponse.body.length).toEqual(restQuantity + 1);
    });
    test("should update first item array in DB" , async()=>{
        await request(app)
        .put("/musicians/1")
        .send({ name: 'qwe', instrument: 'voice' });
        const user = await Musician.findByPk(1);
        expect(user.name).toEqual("qwe");
    });
    test("should delete first item array in DB" , async()=>{
        await request(app).delete("/musicians/1")
        const users = await Musician.findAll({});
        expect(users.length).toEqual(restQuantity);
        expect(users[0].id).not.toEqual(1)
    });


