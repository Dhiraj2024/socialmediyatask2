const mongoose = require('mongoose');
require('dotenv').config(); // .env variables load karega

const connectDB = async () => {
  try {
    // Prefer environment variable (Atlas), else local fallback
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-app';

    // MongoDB connect options
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected successfully to: ${mongoURI.includes('localhost') ? 'Local Database' : 'Atlas Cluster'}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
