//this module is for the db connection
const mongoose = require('mongoose');
const config = require('config');

//getting the mongoURI defined in default.json configuration file (via config module)
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    //connecting to the db
    const result = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
