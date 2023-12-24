const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const { generateToken } = require('../src/utils/tokenManagement');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
//
describe('Post Tests', () => {
    let token;
    let prayer_id;
    beforeAll(async () => {
        await mongoose.connect(
            'mongodb+srv://test_db:kcKxEZdEVoeuTpvO@cluster0.wvevd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            function () {
                /* Drop the DB */
                mongoose.connection.db.dropDatabase();
            }
        );
        token = generateToken({ id: 'test' });
    });
    test('should post a prayer', async () => {
        const res = await request
            .post('/user/v1/prayer')
            .set(`Authorization`, `Bearer ${token.access_token}`)
            .send({
                prayer: 'test is cool'
            });
        prayer_id = res.body.data._id;
        expect(res.statusCode).toEqual(200);
        //expect(res.body).toHaveProperty('post');
    });
    test('should reject prayer', async () => {
        const res = await request.post('/user/v1/prayer').send({
            prayer: 'test is cool'
        });
        expect(res.statusCode).toEqual(403);
        //expect(res.body).toHaveProperty('post');
    });
    test('should get prayers by prayer id', async () => {
        const res = await request
            .post(`/user/v1/answered/${prayer_id}`)
            .set(`Authorization`, `Bearer ${token.access_token}`);
        expect(res.statusCode).toEqual(200);
        //expect(res.body).toHaveProperty('post');
    });
    test('should return not found on get prayers by prayer id', async () => {
        const res = await request
            .post(`/user/v1/answered/3`)
            .set(`Authorization`, `Bearer ${token.access_token}`);
        expect(res.statusCode).toEqual(404);
        //expect(res.body).toHaveProperty('post');
    });
    test('should reject get prayers by prayer id', async () => {
        const res = await request.post(`/user/v1/answered/${prayer_id}`);
        expect(res.statusCode).toEqual(403);
        //expect(res.body).toHaveProperty('post');
    });
    test('get all prayers', async () => {
        const res = await request
            .get(`/user/v1/getall`)
            .set(`Authorization`, `Bearer ${token.access_token}`);
        expect(res.statusCode).toEqual(200);
        //expect(res.body).toHaveProperty('post');
    });
    test('wont get all prayers', async () => {
        const res = await request.get(`/user/v1/getall`);
        expect(res.statusCode).toEqual(403);
        //expect(res.body).toHaveProperty('post');
    });
    test('get all my prayers', async () => {
        const res = await request
            .get(`/user/v1/get-my-prayers`)
            .set(`Authorization`, `Bearer ${token.access_token}`);
        expect(res.statusCode).toEqual(200);
        //expect(res.body).toHaveProperty('post');
    });
    test('reject get all my prayers', async () => {
        const res = await request.get(`/user/v1/get-my-prayers`);
        expect(res.statusCode).toEqual(403);
        //expect(res.body).toHaveProperty('post');
    });
});

// /get-my-prayers
