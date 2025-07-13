const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pushkarvikas7:AzTdD77M7WlRjYJl@cluster0.0xzfcjj.mongodb.net/LuxuryEstate')
.then(() => console.log('Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDB...', err));