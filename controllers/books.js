'use strict';

function bookCtrl(BookModel) {

  return { get, post };

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = new RegExp(req.query.genre, 'i');
    }
    BookModel.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.json(setBookHateos(books, req));
    });
  }

  function setBookHateos(books, req) {
    return books.map(book => {
      const newBook = book.toJSON();
      newBook.links = {
        self: `${req.protocol}://${req.get('host')}${req.originalUrl}/${book._id}`
      }
      return newBook;
    })
  }

  function post(req, res) {
    const book = new BookModel(req.body);

    if (!book.title) {
      res.status(400).send('Title is required');
      return;
    }

    book.save()
    .then(() => {
      res.status(201);
      res.send(book);
    })
    .catch(err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  }
}

module.exports = bookCtrl;