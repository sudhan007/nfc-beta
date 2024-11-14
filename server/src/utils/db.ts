import { connect } from "mongoose";

async function connectToDb() {
  try {
    const conn = await connect(
      "mongodb+srv://sudhancool4:sudhan@cluster0.w6cgj1h.mongodb.net/?retryWrites=true&w=majority",
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
