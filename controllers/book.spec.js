const sinon = require('sinon');
const expect = require('chai').expect;

describe('Book ctrl', () => {
  let bookCtrlFn;

  beforeEach(() => {
    bookCtrlFn = require('./books')
  })
  describe('post()', () => {
    it('should NOT save book without "title"', () => {
      let bookCtrl;
      class BookModel {
        constructor() {}
        save() { return Promise.resolve()}
      };

      let req = {
        body: {}
      };
      let res = {
        status() { return this },
        send: sinon.spy()
      };

      sinon.spy(res, 'status');

      bookCtrl = bookCtrlFn(BookModel);
      bookCtrl.post(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith('Title is required')).to.be.true;

    })
  })
})