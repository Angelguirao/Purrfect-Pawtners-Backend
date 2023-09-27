const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // ℹ️ Middleware to handle 404 errors.
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  // ℹ️ Middleware to handle validation errors.
  app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  });

  // ℹ️ Middleware to handle authentication errors.
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    next(err);
  });

  // ℹ️ Middleware to handle general errors.
  app.use((err, req, res, next) => {
    // ℹ️ Log the error details including the HTTP method and path.
    console.error("ERROR", req.method, req.path, err);

    // ℹ️ Log errors to a file.
    const errorLogPath = path.join(__dirname, 'error.log');
    const logStream = fs.createWriteStream(errorLogPath, { flags: 'a' });
    logStream.write(`[${new Date().toISOString()}] ERROR ${req.method} ${req.path} ${err}\n`);
    logStream.end();

    // ℹ️ Send a 500 Internal Server Error response if no response has been sent yet.
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console and error.log",
      });
    }
  });
};
