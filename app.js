const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/apiRouter');
const config = require('./config');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(config.url, { useNewUrlParser: true }, () => {
  console.log('connected to DB');
});

app.use(express.json());
app.use('/api', apiRouter);

app.listen(3003, () => console.log('Server is listening...'));

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Page not found" });
});

module.exports = { app };
