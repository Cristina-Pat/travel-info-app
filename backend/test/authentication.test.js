import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import supertest from 'supertest';
import server from '../index.js';
import mongoose from 'mongoose';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`
})

chai.use(chaiHttp);

const request = supertest(server);



describe('Testing the authentication', () => {
    // Delete the test database before each test
    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    describe('registration', () => {
        it('should register a user with valid credentials', async () => {
            const username = 'testuser';
            const email = 'test@example.com';
            const password = '456789';

            const res = await request.post('/register')
                .send({ username, email, password });

            expect(res).to.have.status(200);

        });

        it('should return an error for invalid credentials', async () => {
            const username = 'testuser';
            const email = '';
            const password = '12';

            const res = await request.post('/register')
                .send({ username, email, password });

            expect(res).to.have.status(500);
        });
    });


    describe('login', () => {
        it('should authenticate a user with valid credentials', async () => {
            const userEmail = 'hulla@hello.com';
            const userPassword = '123456';

            await request.post('/register')
                .send({ username: userEmail, email: userEmail, password: userPassword });

            const res = await request.post('/login')
                .send({ email: userEmail, password: userPassword });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('accessToken');
        });

        it('should return an error for invalid credentials', async () => {
            const userEmail = 'hulla@hello.com';
            const userPassword = '145263';

            await request.post('/register')
                .send({ username: userEmail, email: userEmail, password: '123456' });

            const res = await request.post('/login')
                .send({ email: userEmail, password: userPassword });

            expect(res).to.have.status(403);
        });
        // edge cases for login tests suggested by GitHub Copilot - see the suggested edge cases
        it('should return an error for empty email or password', async () => {
            const res = await request.post('/login')
                .send({ email: '', password: '' });

            expect(res).to.have.status(404);
        });


        it('should return an error for invalid email format', async () => {
            const res = await request.post('/login')
                .send({ email: 'invalid', password: 'password' });

            expect(res).to.have.status(404);
        });
    });
});