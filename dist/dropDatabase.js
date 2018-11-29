const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost:27017/myapp';
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.dropDatabase()