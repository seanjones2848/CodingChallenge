const chai = require('chai');
const chaiHttp = require('chai-http')
const request = require('supertest');
const { expect } = require('chai');

chai.use(chaiHttp)

const app = 'http://localhost:3030';

describe('Testing Comments API Comment Injestion', () => {
    it('should injest comment1 and fail', (done) => {
        request(app)
        .post('/comments')
        .send({
            "shootId": 1,
            "comment": "Nice!"
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(400)
            done()
        })
    });
    it('should injest comment2', (done) => {
        request(app)
        .post('/comments')
        .send({
            "shootId": 2,
            "comment": "I don't like it."
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(201)
            done()
        })
    });
    it('should injest comment3', (done) => {
        request(app)
        .post('/comments')
        .send({
            "shootId": 1,
            "comment": "<script>alert('hello!');</script>"
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(201)
            done()
        })
    });
});

describe('Testing Comments API Comment Retrieval', () => {
    it('should retrieve comments for shootId 1', (done) => {
        request(app)
        .get('/comments')
        .query({shootId: '1'})
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200)
            done()
        })
    })
    it('should retrieve comments for shootId 2', (done) => {
        request(app)
        .get('/comments')
        .query({shootId: '2'})
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200)
            done()
        })
    })
});

describe('Testing Comments API Comment Injestion Failures', () => {
    it('should fail on comment existance check', (done) => {
        request(app)
        .post('/comments')
        .send({
            "shootId": "1"
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(400)
            done()
        })
    })
    it('should fail on comment existance check', (done) => {
        request(app)
        .post('/comments')
        .send({
            "comment": "this is a great comment"
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(400)
            done()
        })
    })
    it('should fail on shootId being an integer', (done) => {
        request(app)
        .post('/comments')
        .send({
            "shootId": "one",
            "comment": "this is a great comment"
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(400)
            done()
        })
    })
    it('should fail on comment length', (done) => {
        request(app)
        .post('/comments')
        .send({
            "shootId": "1",
            "comment": "short"
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(400)
            done()
        })
    })
    it('should fail on comment length', (done) => {
        request(app)
        .post('/comments')
        .send({
            "shootId": "1",
            "comment": "This here is a too long comment that has waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay too many characters"
        })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(400)
            done()
        })
    })
});

describe('Testing Comments API Comment Retrieval Failures', () => {
    it('should not exist', (done) => {
        request(app)
        .get('/comments')
        .query({shootId: '4'})
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(404)
            done()
        })
    })
    it('should not work', (done) => {
        request(app)
        .get('/comments')
        .query({})
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(400)
            done()
        })
    })
})
