import * as chai from "chai"
import { expect } from "chai"
import chaiHttp from "chai-http"
import supertest from "supertest"
import server from "../index.js";
import mongoose from 'mongoose';


chai.use(chaiHttp);

const request = supertest(server);
let accessToken;

describe('Server test', () => {
    // Delete the test database, register new user, and login before all tests
    before(async () => {
        await mongoose.connection.dropDatabase();
        const username = 'Cristina';
        const email = 'test@example.com';
        const password = '456789';

        await request.post('/register')
            .send({ username, email, password });

        const res = await request.post('/login')
            .send({ email: email, password: password });

        accessToken = res.body.accessToken;
    });

    afterEach(async () => {
        await server.close();
    });

    it('should make a POST request on /favourites and return an array', async () => {
        const res = await request.post('/favourites').send({ accessToken: accessToken });
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
    });

    it('should make a POST request on /favourites/add and add a favourite location', async () => {
        const addRes = await request.post('/favourites/add').send({ accessToken: accessToken, location: 'Dublin' });
        expect(addRes).to.have.status(200);

        const getRes = await request.post('/favourites').send({ accessToken: accessToken });
        expect(getRes).to.have.status(200);
        console.log(getRes.body);
        expect(getRes.body[0]).to.be.equal('Dublin');
    });
    
    it('should make a POST request on /favourites/remove and remove a favourite location', async () => {
        const addRes = await request.post('/favourites/remove').send({ accessToken: accessToken, location: 'Dublin' });
        expect(addRes).to.have.status(200);

        const getRes = await request.post('/favourites').send({ accessToken: accessToken });
        expect(getRes).to.have.status(200);
        console.log(getRes.body);
        expect(getRes.body.length).to.be.equal(0);
    });
});
