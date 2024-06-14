import mongoose from "mongoose";
import app from "./app";

const port = 3000;

main();

async function main() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017"
    );
  } catch (e) {
    console.error(`error connecting to the database: ${e}`);
    process.exit(1);
  }
  console.log("successfully connected to the database");

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
