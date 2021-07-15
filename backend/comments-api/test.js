const express = require('express');
const chai = require('chai');
const request = require('supertest');
const { expect } = require('chai');
const { exit } = require('process');
const { doesNotMatch } = require('assert');

const app = express();

const comment1 = {
    "shootId": 1,
    "comment": "Nice!"
}

const comment2 = {
    "shootId": 2,
    "comment": "I don't like it."
}

const comment3 = {
    "shootId": 1,
    "comment": "<script>alert('hello!');</script>"
}

describe('Testing Comments API Comment Injestion', () => {
    it('should injest comment1', () => {
        request(app)
        .post('comments')
        .send(comment1)
        .expect(201)
    });
    it('should injest comment2', () => {
        request(app)
        .post('comments')
        .send(comment2)
        .expect(201)
    });
    it('should injest comment3', () => {
        request(app)
        .post('comments')
        .send(comment3)
        .expect(201)
    });
});

describe('Testing Comments API Comment Retrieval', () => {
    it('should retrieve comments for shootId 1', () => {
        request(app)
        .get('comments')
        .query({shootId: '1'})
        .expect(201)
    })
    it('should retrieve comments for shootId 2', () => {
        request(app)
        .get('comments')
        .query({shootId: '2'})
        .expect(201)
    })
    it('should retrieve comments for shootId 3', () => {
        request(app)
        .get('comments')
        .query({shootId: '3'})
        .expect(201)
    })
});

describe('Testing Comments API Comment Injestion Failures', () => {
    it('should fail on comment existance check', () => {
        request(app)
        .post('comments')
        .send({
            "shootId": "1"
        })
        .expect(400)
    })
    it('should fail on comment existance check', () => {
        request(app)
        .post('comments')
        .send({
            "comment": "this is a great comment"
        })
        .expect(400)
    })
    it('should fail on shootId being an integer', () => {
        request(app)
        .post('comments')
        .send({
            "shootId": "one",
            "comment": "this is a great comment"
        })
        .expect(400)
    })
    it('should fail on comment length', () => {
        request(app)
        .post('comments')
        .send({
            "shootId": "1",
            "comment": "short"
        })
        .expect(400)
    })
    it('should fail on comment length', () => {
        request(app)
        .post('comments')
        .send({
            "shootId": "1",
            "comment": "This here is a too long comment that has waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay too many characters"
        })
        .expect(400)
    })
});

describe('Testing Comments API Comment Retrieval Failures', () => {
    it('should not exist', () => {
        request(app)
        .get('comments')
        .query({shootId: '4'})
        .expect(404)
    })
    it('should not work', () => {
        request(app)
        .get('comments')
        .query({})
        .expect(400)
    })
})
