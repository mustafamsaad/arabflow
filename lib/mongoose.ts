import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCashed {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCashed;
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}
const dbConnect = async () => {
  if (cached.conn) {
    logger.info("Using cached connection to database");
    return cached.conn;
  }
  cached.promise ??= mongoose
    .connect(MONGODB_URI, {
      dbName: "arabflow",
    })
    .then((result) => {
      logger.info("Connected to database");
      return result;
    })
    .catch((error) => {
      logger.error("Error connecting to database", error);
      throw error;
    });
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
