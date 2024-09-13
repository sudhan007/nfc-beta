import { connect } from "mongoose";

async function connectToDb() {
  try {
    const conn = await connect(
      "mongodb://root:rootPasswordSmauG@15.207.254.223/?authSource=admin",
      {
        dbName: "nfc",
      }
    );
    console.log("Connected to MongoDB");
    return conn;
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

export { connectToDb };
