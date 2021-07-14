const express = require('express');
const chai = require('chai');
const request = require('supertest');
const { expect } = require('chai');

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
        .then((res) => {
            expect(res.headers.location).to.be.eql('comments');
        })
    });
    it('should injest comment2', () => {
        request(app)
        .post('comments')
        .send(comment2)
        .expect(201)
        .then((res) => {
            expect(res.headers.location).to.be.eql('comments');
        })
    });
    it('should injest comment3', () => {
        request(app)
        .post('comments')
        .send(comment3)
        .expect(201)
        .then((res) => {
            expect(res.headers.location).to.be.eql('comments');
        })
    });
});

