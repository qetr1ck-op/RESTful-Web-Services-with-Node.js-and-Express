const sut = require('../app');

const should = require('chai').should();
const request = require('supertest');
const agent = request(sut);
const mongoose = require('mongoose');
const bookModel = mongoose.model('books');

describe('Book CRUD', () => {

  describe('post()', () => {

    it('should post a book and return new entity with "_id"', done => {
      afterEach(() => {
        bookModel.remove({}).then(done);
      })

      const books = {
        'title': `Science Title`,
        'genre': 'Science Fiction',
        'author': 'Jules Verne'
      }

      agent.post('/api/books')
        .send(books)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.ok;
          res.body.should.have.property('_id');
          done()
        })

    })
  })
})