export default async function dbConnect() {
  // Ensures this function only runs on the server
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const mongoose = await import("mongoose");
    require("dotenv").config();

    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/moveIn";
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    interface CachedMongoose {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    }

    // Initialize a global cached mongoose connection to prevent re-initialization
    const globalWithMongoose = global as NodeJS.Global & {
      mongoose?: CachedMongoose;
    };
    let cached: CachedMongoose = globalWithMongoose.mongoose || {
      conn: null,
      promise: null,
    };

    if (!globalWithMongoose.mongoose) {
      globalWithMongoose.mongoose = cached;
    }

    // Connect to MongoDB
    async function connectToDatabase(): Promise<typeof mongoose> {
      if (cached.conn) {
        return cached.conn;
      }

      if (!cached.promise) {
        cached.promise = mongoose
          .connect(MONGODB_URI)
          .then((mongooseInstance) => {
            return mongooseInstance;
          });
      }

      try {
        cached.conn = await cached.promise;
        console.log(">> MongoDB connection successfull.");
      } catch (error) {
        cached.promise = null;
        console.error("Failed to connect to MongoDB:", error);
        throw new Error(
          "Failed to connect to MongoDB: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      }

      return cached.conn;
    }

    await connectToDatabase();
  }
}
await dbConnect();
