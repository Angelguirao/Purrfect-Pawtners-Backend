// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Proyect3-back";

mongoose
  .connect(MONGO_URI)
  .then((connection) => {
    // ℹ️ Log the name of the connected database.
    const dbName = connection.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    // ℹ️ Log any errors that occur during the connection.
    console.error("Error connecting to mongo: ", err);
  });
