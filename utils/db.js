// get mongoose
import mongoose from 'mongoose';

// get db connection string from .env filr
const MONGODB_URI = process.env.MONGODB_CONNECTON_STRING;

// check if connection exist or not
if( !MONGODB_URI ){
    throw new Error("Please add  your Mongo URI to .env local");
}

let cached = global.mongoose;

if( !cached ){
    cached = global.mongoose = { conn: null, promise: null }
}

// function to connect to database
async function connectToDatabase() {

    // if already connected returns that connection
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };
  
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  }
  
  export default connectToDatabase;

  