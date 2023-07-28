import supertest from 'supertest';
import { expect } from 'chai'; 
import app from '../index.js';
import { request } from 'express';

const requestWithSupertest = supertest(app);

describe('Testing GET /movies/id/:id endpoint', function() {
    it('responds with a valid HTTP status code and response body', async function () {
        const response = await requestWithSupertest.get(
            '/api/v1/movies/id/573a1390f29313caabcd4135' 
            );
        expect(response.status).to.equal(200); 
        expect(response.body.title).to.equal("Blacksmith Scene");
    });
});

describe('Testing GET /movies/ratings endpoint', function () {
    it('responds with a valid HTTP status code and ratings',
    async function () {
        const response = await requestWithSupertest.get('/api/v1/movies/ratings');
        expect(response.status).to.equal(200);
        expect(response.body[0]).to.equal('AO');
        expect(response.body.length).to.equal(21);
    });
});

describe('Testing POST /reviews endpoint', function () {
    it('responds with a valid HTTP status code and number of movies', async function () {
        const req_body = {
            "movie_id": '573a1390f29313caabcd4135',
            "review": "This is a TEST review",
            "user_id": "1234",
            "name": "Testy Testerson"
        }
        const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                   .send(req_body);
        
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('success');
        
        const del_body = {
            "review_id": response.body.response.insertedId,
        }
        await requestWithSupertest.delete('/api/v1/movies/review')
                                    .send(del_body);
    });
});

describe('Testing PUT /reviews endpoint', function () {
    it('fails to update a review with the wrong user ID', async function () {
        const req_body = {
            "movie_id": '573a1390f29313caabcd4135',
            "review": "This is a TEST review",
            "user_id": "1234",
            "name": "Test Testerson"
        }
        const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                   .send(req_body);

        const update_body = {
            "review_id": response.body.response.insertedId,
            "review": "This is an UPDATED TEST review",
            "user_id": "1235"
        }
        const update_response = await requestWithSupertest.put('/api/v1/movies/review')
                                                          .send(update_body);
        expect(update_response.status).not.to.equal(200);
        expect(update_response.body.status).not.to.equal('success');

        const del_body = {
            "review_id": response.body.response.insertedId,
        }
        await requestWithSupertest.delete('/api/v1/movies/review')
                                    .send(del_body);
    });
});

describe('Testing PUT /reviews endpoint', function () {
    it('succeeds in updating a review with the correct user ID', async function () {
        const req_body = {
            "movie_id": '573a1390f29313caabcd4135',
            "review": "This is a TEST review",
            "user_id": "1234",
            "name": "Test Testerson"
        }
        const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                   .send(req_body);

        const update_body = {
            "review_id": response.body.response.insertedId,
            "review": "This is an UPDATED TEST review",
            "user_id": "1234"
        }
        const update_response = await requestWithSupertest.put('/api/v1/movies/review')
                                                          .send(update_body);
        expect(update_response.status).to.equal(200);
        expect(update_response.body.status).to.equal('success');

        const del_body = {
            "review_id": response.body.response.insertedId,
        }
        await requestWithSupertest.delete('/api/v1/movies/review')
                                    .send(del_body);
    });
});

describe('Testing DELETE /reviews endpoint', function () {
    it('responds with a valid HTTP status code', async function () {
        const req_body = {
            "movie_id": '573a1390f29313caabcd4135',
            "review": "This is a TEST review",
            "user_id": "1234",
            "name": "Testy Testerson"
        }
        const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                   .send(req_body);
        const del_body = {
            "review_id": response.body.response.insertedId,
        }
        const del_response = await requestWithSupertest.delete('/api/v1/movies/review')
                                                        .send(del_body);
        
        expect(del_response.status).to.equal(200);
        expect(del_response.body.status).to.equal('success');
    });
});
