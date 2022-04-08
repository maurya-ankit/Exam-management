import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: undefined, promise: undefined };
}

async function databaseConnect() {
  if (cached.conn) {
    console.log('Using cached connection to MongoDB');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Connecting to MongoDB');
    const options = {
      bufferCommands: false
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then(mongoose => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log('Connected to MongoDB');
  return cached.conn;
}

export default databaseConnect;
