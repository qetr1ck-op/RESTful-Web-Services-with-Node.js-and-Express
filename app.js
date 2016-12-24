const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
connectToDB(process.env.NODE_ENV);

const bookRouter = require('./routes/book');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => console.log(`Running on ${port}`));

function connectToDB(env) {
  switch (env) {
    case 'test':
      // connect to the "bookAPI_test"
      mongoose.connect('mongodb://localhost/bookAPI_test');
      break;
    default:
      // the minimum needed to connect the "bookAPI" database running locally on the default port (27017)
      mongoose.connect('mongodb://localhost/bookAPI');
  }

  // mongoose's Promise library is deprecated, using es6's
  mongoose.Promise = Promise;
}

module.exports = app;