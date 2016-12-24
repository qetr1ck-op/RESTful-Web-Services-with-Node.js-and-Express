const express = require('express');
const BookModel = require('../models/books');
const bookCtrl = require('../controllers/books')(BookModel);

const bookRouter = express.Router();

bookRouter.route('/books')
  .get(bookCtrl.get)
  .post(bookCtrl.post);

bookRouter.use('/books/:id', (req, res, next) => {
  BookModel.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (book) {
      req.book = book;
      next();
      return;
    }

    res.status(404).send('book not found');
  });
})
bookRouter.route('/books/:id')
  .get((req, res) => {
    res.json(req.book);
  })
  .put((req, res) => {
    const newBook = Object.assign(req.book, req.body);

    newBook.save()
      .then(() => {
        res.json(newBook);
      })
      .catch(err => {
        if (err) {
          res.status(500).send(err);
        }
      });
  })
  .patch((req, res) => {
    delete req.body.id;
    const updatedBook = Object.assign(req.book, req.body);

    console.log(updatedBook);
    updatedBook.save()
      .then(() => {
        res.json(updatedBook);
      })
      .catch(err => {
        if (err) {
          res.status(500).send(err);
        }
      });
  })
  .delete((req, res) => {
    req.book.remove()
      .then(() => {
        res.status(204).send();
      })
      .catch(err => {
        if (err) {
          res.status(500).send(err);
        }
      });
  });

module.exports = bookRouter;