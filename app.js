// ℹ️ Gets access to environment variables/settings
// dotenv is crucial for securing sensitive information such as API keys and database credentials.
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
// This is establishing a connection to the database using configurations specified in ./db.
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Importing various route handlers and associating them with their respective endpoints.
const indexRoutes = require("./routes/index.routes");
app.use("/api/index", indexRoutes);

const homeRoutes = require('./routes/home.routes');
app.use('/api/homes', homeRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const catsRoutes = require("./routes/cats.routes");
app.use("/api/cats", catsRoutes);

const articlesRoutes = require("./routes/articles.routes");
app.use("/api/articles", articlesRoutes);

const commentsRoutes = require("./routes/comments.routes");
app.use("/api/comments", commentsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// This is crucial for returning proper error messages and status codes to the client.
require("./error-handling")(app);

// Exporting the app object for use in other files, such as server.js.
module.exports = app;
