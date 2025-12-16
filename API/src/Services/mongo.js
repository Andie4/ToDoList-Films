require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectToMongoDB() {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    // console.log("SECRET_KEY:", SECRET_KEY);

    await mongoose.connect(SECRET_KEY, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();

process.on("SIGINT", async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});
