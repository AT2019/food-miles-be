const express = require("express");
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/apiRouter');
const config = require('./config/configuration');
const dotenv = require('dotenv');
const { customErrors } = require('./errors/index');

dotenv.config();
mongoose.connect(
  config.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB');
  }
);

app.use(express.json({ limit: "50mb" }));
app.use('/api', apiRouter);

app.use(customErrors);

app.listen(3003, () => console.log('Server is listening...'));

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
});

module.exports = { app };
