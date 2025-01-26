declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: CachedMongoose;
    }
  }
}

// This is needed to make the declaration file a module.
export {};
