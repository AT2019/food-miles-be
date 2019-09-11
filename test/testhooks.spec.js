const mongoose = require('mongoose');

after((done) => {
  mongoose.connection.close();
  done();
})
