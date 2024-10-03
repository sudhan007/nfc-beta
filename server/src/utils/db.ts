import { connect } from "mongoose";

async function connectToDb() {
  try {
    const conn = await connect(
      "mongodb://root:rootPasswordSmauG@13.235.75.104/?authSource=admin",
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
