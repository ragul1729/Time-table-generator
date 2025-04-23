const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/TimeTable', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('Mongoose connection error:', err);
  }
}

module.exports = { connectDB };