const mongoose = require('mongoose');
const username = process.env.USERNAME;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.0xzfcjj.mongodb.net/LuxuryEstate`;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
