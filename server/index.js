const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const article = require('./routes/article.route');
const user = require('./routes/user.route');
const expert = require('./routes/expert.route');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/moneyloan');
}

main()
  .then(() => console.log('Connected to mongo db'))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use('/article', article);
app.use('/user', user);
app.use('/expert', expert);

const errorHandeler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandeler);
// app.get('/', (req, res) => res.send('Hello world'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening in port ${port}`));
