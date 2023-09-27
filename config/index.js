// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// ℹ️ Needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request if from the same domain, by default express wont accept POST requests
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

// Middleware configuration
module.exports = (app) => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like heroku use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // ℹ️ Enable Cross-Origin Resource Sharing with the specified frontend URL.
  // This is essential for making HTTP requests to Express from a different domain.
  app.use(cors({ origin: [FRONTEND_URL] }));

  // ℹ️ Logger to log incoming requests in development.
  app.use(logger("dev"));

  // ℹ️ Enable parsing of JSON payloads in the body of HTTP requests.
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  // ℹ️ Enable parsing of cookies in HTTP requests.
  app.use(cookieParser());
};
