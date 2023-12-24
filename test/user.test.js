const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const { generateToken } = require('../src/utils/tokenManagement');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

describe('Authentication Tests', () => {
    //const token = generateToken({ id: });
    beforeAll(async () => {
        await mongoose.connect(
            'mongodb+srv://test_db:kcKxEZdEVoeuTpvO@cluster0.wvevd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            function () {
                /* Drop the DB */
                mongoose.connection.db.dropDatabase();
            }
        );
    });
    test('should sign up', async () => {
        await request
            .post('/user/v1/sign-up')
            .set('Accept', 'application/json')
            // .set(`Authorization`, `Bearer ${token.access_token}`)
            .send({
                user_name: 'Juwon2',
                password: '1234',
                email: 'juwon2@mail.com'
            })
            .expect('Content-Type', /json/)
            .expect(200);
    });
    test('should fail sign up', async () => {
        const response = await request
            .post('/user/v1/sign-up')
            .set('Accept', 'application/json')
            .send({
                user_name: 'Juwon',
                password: '1234'
            });
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should login', async () => {
        const response = await request
            .post('/user/v1/login')
            .set('Accept', 'application/json')
            .send({
                user_name: 'Juwon',
                password: '1234',
                email: 'juwon2@mail.com'
            });
        expect(response.status).toBe(httpStatus.OK);
    });
    test('login should fail', async () => {
        const response = await request
            .post('/user/v1/login')
            .set('Accept', 'application/json')
            .send({
                user_name: 'Juwon',
                password: '12345',
                email: 'juwon2@mail.com'
            });
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
});

// /get-my-prayers
