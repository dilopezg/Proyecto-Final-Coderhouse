import "dotenv/config";
import mongoose from "mongoose";

const URI = process.env.MONGO_URI
  ? process.env.MONGO_URI
  : "mongodb://localhost/dbtest";

mongoose.connect(URI, (error) => {
  if (error) {
    console.log(`🌋🌋🌋 Fallo la Conexion MongoDB_Atlas:  ${error}`);
  } else {
    console.log("📡📡📡[MongoDB_Atlas OK]📡📡📡\n");
  }
});
