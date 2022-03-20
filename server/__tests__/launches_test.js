const request = require('supertest');
const app = require('../src/app.js');
const { mongoConnect, mongoDisconnect } = require('../src/services/mongo');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    })
    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app).get('/v1/launches').expect('Content-type', /json/).expect(200);
        });
    })
    
    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: 'Jest Mission',
            rocket: 'Jest rocket',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028'
        }
    
        const launchDataWithoutDate = {
            mission: 'Jest Mission',
            rocket: 'Jest rocket',
            target: 'Kepler-62 f',    
        }
    
        const launchDataWithInvalidDate = {
            mission: 'Jest Mission',
            rocket: 'Jest rocket',
            target: 'Kepler-62 f',
            launchDate: 'Eggcelent'
        }
        
        test('It should respond with 201 created', async () =>  {
            const response = await request(app).
            post('/v1/launches').
            send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)
    
        
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate)
    
            expect(response.body).toMatchObject({
                mission: 'Jest Mission',
                rocket: 'Jest rocket',
                target: 'Kepler-62 f',
    
            });
        });
    
        test('It should catch missing required properties', async () => {
                const response = await request(app).
                post('/v1/launches').
                send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400)
    
                expect(response.body).toStrictEqual({error: "Missing one or more launch properties."})
        });
    
        test ('It should catch misformated dates', async () => {
            const response = await request(app).
            post('/v1/launches').
            send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({error: 'Invalid launch date'})
        });



})

})