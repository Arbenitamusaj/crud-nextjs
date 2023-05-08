import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/crud";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = typeof window !== "undefined" ? window.mongoose : {};

if (!cached.conn) {
  cached.conn = null;
}

if (!cached.promise) {
  cached.promise = null;
}

const dbConnect = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  console.log("Creating new MongoDB connection");

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
